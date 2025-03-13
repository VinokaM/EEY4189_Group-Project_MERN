import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffAppointments.css"; 

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); 
  const [doctors, setDoctors] = useState([]); 
  const [selectedDoctor, setSelectedDoctor] = useState(""); 
  const [filterDate, setFilterDate] = useState(""); 

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all-appointments");
        setAppointments(response.data);
        setFilteredAppointments(response.data); 
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchAllAppointments();
    fetchAllDoctors();
  }, []);

  // Function to handle status update
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8080/appointment/${appointmentId}/status`, {
        status: newStatus,
      });

      // Update the appointments state with the updated status
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
        )
      );

      setFilteredAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
        )
      );

      alert("Appointment status updated successfully!");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "confirmed":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  // Function to handle filtering based on date and doctor
  const handleFilter = () => {
    const filtered = appointments.filter((appointment) => {
      const matchesDate = filterDate
        ? new Date(appointment.appointmentDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
        : true;
      const matchesDoctor = selectedDoctor
        ? appointment.doctorId && appointment.doctorId._id === selectedDoctor
        : true;

      return matchesDate && matchesDoctor;
    });

    setFilteredAppointments(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterDate("");
    setSelectedDoctor("");
    setFilteredAppointments(appointments); // Reset to original appointments
  };

  return (
    <div className="staff-appointments-container">
      <h2>All Appointments</h2>

      {/* Filtering section */}
      <div className="filter-section">
        <label>
          Filter by Date:
          <input className="filterInput"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <label>
          Filter by Doctor:
          <select className="filterInput"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">All Doctors</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </label>
        <button className="filterbtn" onClick={handleFilter}>Apply Filters</button>
        <button className="filterbtn2" onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul className="staffApp">
  {filteredAppointments.map((appointment) => (
    <li key={appointment._id} style={{ borderColor: getStatusColor(appointment.status) }}>
      <strong>Appointment Number:</strong> {appointment.appointmentNumber} <br />
      <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
      <strong>Time:</strong> {appointment.appointmentTime} <br />
      <strong>Patient:</strong> {appointment.patientId ? `${appointment.patientId.firstName} ${appointment.patientId.lastName}` : "Unknown Patient"} <br />
      <strong>Doctor:</strong> {appointment.doctorId ? `Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}` : "Unknown Doctor"} <br />
      <strong>Symptoms:</strong> {appointment.symptoms} <br />
      <strong>Status:</strong> 
      <span style={{ color: getStatusColor(appointment.status) }}>
        {appointment.status}
      </span>
      <br />

      {/* Dropdown to change status */}
      <select
        value={appointment.status}
        onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
      </select>
    </li>
  ))}
</ul>

    </div>
  );
};

export default StaffAppointments;
