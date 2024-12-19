import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientAppointments.css";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/appointments/patient/${patientId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [patientId]);

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

  return (
    <div className="pappointments-container">
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} style={{ borderColor: getStatusColor(appointment.status) }}>
            <strong>Appointment Number:</strong> {appointment.appointmentNumber || "N/A"} <br />
            <strong>Time:</strong> {appointment.appointmentTime || "N/A"} <br />
            <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
            <strong>Doctor:</strong> 
            {appointment.doctorId ? (
              <>Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}</>
            ) : (
              "Doctor details not available"
            )}
            <br />
            <strong>Symptoms:</strong> {appointment.symptoms} <br />
            <strong>Status:</strong>{" "}
            <span style={{ color: getStatusColor(appointment.status) }}>
              {appointment.status}
            </span>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointments;
