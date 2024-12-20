import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorAppointments.css"; // Import CSS file for custom styling

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // For date filtering
  const [filterDate, setFilterDate] = useState(""); // Date filter state
  const doctorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/appointments/${doctorId}`);
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Initialize with all appointments
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [doctorId]);

  // Function to handle status update
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:8080/appointment/${appointmentId}/status`, {
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

  // Function to handle filtering by date
  const handleDateFilter = () => {
    if (filterDate) {
      const filtered = appointments.filter((appointment) => 
        new Date(appointment.appointmentDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments); // Reset if no filter
    }
  };

  // Reset the date filter
  const resetDateFilter = () => {
    setFilterDate("");
    setFilteredAppointments(appointments); // Reset to original appointments
  };

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>

      {/* Date filter section */}
      <div className="filter-section">
        <label>
          Search Your Appointments
          <input className="filterInput"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <button className="filterbtn" onClick={handleDateFilter}>Apply Filter</button>
        <button className="filterbtn2" onClick={resetDateFilter}>Reset Filter</button>
      </div>

      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment._id} style={{ borderColor: getStatusColor(appointment.status) }}>
            <strong>Appointment Number:</strong> {appointment.appointmentNumber} <br />
            <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
            <strong>Time:</strong> {appointment.appointmentTime} <br />
            <strong>Patient:</strong> {appointment.patientId.firstName} {appointment.patientId.lastName} <br />
            <strong>Symptoms:</strong> {appointment.symptoms} <br />
            <strong>Status:</strong>{" "}
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

export default DoctorAppointments;
