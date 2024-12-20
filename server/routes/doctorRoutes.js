const express = require("express");
const router = express.Router();
const { User } = require("../models/userData");
const Appointment = require("../models/appointment");
const AppointmentSchedule = require("../models/AppointmentSchedule"); // Import the new model

const MAX_APPOINTMENTS_PER_DAY = 15;
const START_TIME = 17; // 5:00 PM in 24-hour format
const SLOT_DURATION = 15; // 15 minutes per appointment

// Function to calculate time slot
const calculateTimeSlot = (appointmentNumber) => {
  const startHour = Math.floor(START_TIME + ((appointmentNumber - 1) * SLOT_DURATION) / 60);
  const startMinute = ((appointmentNumber - 1) * SLOT_DURATION) % 60;
  return `${startHour}:${startMinute.toString().padStart(2, "0")} PM`;
};

// Get all doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.json(doctors);
  } catch (error) {
    res.status(500).send("Error fetching doctors");
  }
});

// Patient makes an appointment
router.post("/appointment", async (req, res) => {
  const { patientId, doctorId, appointmentDate, symptoms } = req.body;

  try {
    // Find the schedule for the doctor on the specified day
    const existingSchedule = await AppointmentSchedule.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
    });

    // If no schedule exists for the day, create a new one
    if (!existingSchedule) {
      const newSchedule = new AppointmentSchedule({
        doctorId,
        appointmentDate,
        bookedSlots: [],
      });
      await newSchedule.save();
    }

    // Check if the doctor has available slots for the day
    const schedule = await AppointmentSchedule.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
    });

    if (schedule.bookedSlots.length >= MAX_APPOINTMENTS_PER_DAY) {
      return res.status(400).json({ message: "No available slots for this day." });
    }

    // Generate appointment number and time
    const appointmentNumber = schedule.bookedSlots.length + 1;
    const appointmentTime = calculateTimeSlot(appointmentNumber);

    // Create the appointment record
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      symptoms,
    });
    await newAppointment.save();

    // Update the schedule with the new appointment
    schedule.bookedSlots.push({
      patientId,
      appointmentNumber,
      time: appointmentTime,
    });
    await schedule.save();

    res.status(201).json({ 
      message: "Appointment created successfully",
      appointmentNumber,
      appointmentTime 
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).send("Error creating appointment");
  }
});

// Get appointments for a specific doctor
router.get("/appointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    // Fetch all appointments for the given doctorId
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "firstName lastName email")
      .populate("doctorId", "firstName lastName");

    // Fetch all related schedules for this doctor and date
    const appointmentSchedules = await AppointmentSchedule.find({ doctorId });

    // Combine the data from Appointment and AppointmentSchedule
    const combinedData = appointments.map(appointment => {
      // Find the matching schedule for the given appointment date
      const matchingSchedule = appointmentSchedules.find(
        schedule =>
          schedule.appointmentDate.toISOString() === appointment.appointmentDate.toISOString()
      );

      // If a matching schedule is found, find the relevant booked slot
      if (matchingSchedule) {
        const bookedSlot = matchingSchedule.bookedSlots.find(
          slot => slot.patientId.toString() === appointment.patientId._id.toString()
        );

        // If a booked slot is found, include appointment number and time
        if (bookedSlot) {
          return {
            _id: appointment._id,
            appointmentDate: appointment.appointmentDate,
            patientId: appointment.patientId,
            symptoms: appointment.symptoms,
            status: appointment.status,
            appointmentNumber: bookedSlot.appointmentNumber,
            appointmentTime: bookedSlot.time,
          };
        }
      }

      // If no matching slot is found, return only appointment details
      return {
        _id: appointment._id,
        appointmentDate: appointment.appointmentDate,
        patientId: appointment.patientId,
        symptoms: appointment.symptoms,
        status: appointment.status,
      };
    });

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send("Error fetching appointments");
  }
});

// Update appointment status
router.patch("/appointment/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    res.status(200).send(updatedAppointment);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all appointments (including doctor and patient details)
router.get("/all-appointments", async (req, res) => {
  try {
    // Fetch all appointments with doctor and patient details
    const appointments = await Appointment.find()
      .populate("doctorId", "firstName lastName") // Populate doctor details
      .populate("patientId", "firstName lastName"); // Populate patient details

    // Fetch appointment numbers and times for each appointment
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (appointment) => {
        // Find the schedule for the doctor on the specific appointment date
        const schedule = await AppointmentSchedule.findOne({
          doctorId: appointment.doctorId,
          appointmentDate: appointment.appointmentDate,
        });

        // Ensure the schedule exists and has booked slots
        if (schedule && schedule.bookedSlots.length > 0) {
          // Find the specific booked slot that matches the patient's appointment
          const bookedSlot = schedule.bookedSlots.find(
            (slot) => String(slot.patientId) === String(appointment.patientId._id)
          );

          // If a matching bookedSlot is found, use its appointmentNumber and time
          if (bookedSlot) {
            return {
              ...appointment.toObject(),
              appointmentNumber: bookedSlot.appointmentNumber,
              appointmentTime: bookedSlot.time,
            };
          }
        }

        // If no matching slot found, return the appointment with "N/A" values
        return {
          ...appointment.toObject(),
          appointmentNumber: "N/A",
          appointmentTime: "N/A",
        };
      })
    );

    res.status(200).send(appointmentsWithDetails);
  } catch (error) {
    console.error("Error fetching appointments with details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// API to fetch appointments for a specific patient
router.get("/appointments/patient/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    // Fetch all appointments for the given patientId
    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "firstName lastName email") // Fetch doctor's details
      .populate("patientId", "firstName lastName email"); // Fetch patient's details

    // Fetch all schedules that have this patient in any bookedSlots
    const appointmentSchedules = await AppointmentSchedule.find({
      "bookedSlots.patientId": patientId,
    });

    // Combine the data from Appointment and AppointmentSchedule
    const combinedData = appointments.map(appointment => {
      // Find the matching schedule for the given appointment date
      const matchingSchedule = appointmentSchedules.find(
        schedule =>
          schedule.appointmentDate.toISOString() === appointment.appointmentDate.toISOString()
      );

      // If a matching schedule is found, find the relevant booked slot
      if (matchingSchedule) {
        const bookedSlot = matchingSchedule.bookedSlots.find(
          slot => slot.patientId.toString() === patientId
        );

        // If a booked slot is found, include appointment number and time
        if (bookedSlot) {
          return {
            _id: appointment._id,
            appointmentDate: appointment.appointmentDate,
            doctorId: appointment.doctorId,
            symptoms: appointment.symptoms,
            status: appointment.status,
            appointmentNumber: bookedSlot.appointmentNumber,
            appointmentTime: bookedSlot.time,
          };
        }
      }

      // If no matching slot is found, return only appointment details
      return {
        _id: appointment._id,
        appointmentDate: appointment.appointmentDate,
        doctorId: appointment.doctorId,
        symptoms: appointment.symptoms,
        status: appointment.status,
      };
    });

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).send("Error fetching patient appointments");
  }
});




module.exports = router;
