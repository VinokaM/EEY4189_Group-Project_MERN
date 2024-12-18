const mongoose = require("mongoose");

const appointmentScheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "profileManagement", required: true },
  appointmentDate: { type: Date, required: true },
  bookedSlots: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: "profileManagement" },
      appointmentNumber: { type: Number },
      time: { type: String },
    },
  ],
});

const AppointmentSchedule = mongoose.model("AppointmentSchedule", appointmentScheduleSchema);

module.exports = AppointmentSchedule;
