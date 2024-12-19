import React, { useState, useEffect } from "react";
import axios from "axios";
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState(null); // To store appointment number and time
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/doctors");
        const doctorData = response.data;

        // Fetch details for each doctor
        const doctorsWithDetails = await Promise.all(
          doctorData.map(async (doctor) => {
            try {
              const detailsResponse = await axios.get(`http://localhost:8080/doctor/details/${doctor._id}`);
              return { ...doctor, ...detailsResponse.data };
            } catch (error) {
              console.error(`Failed to fetch details for doctor ${doctor._id}:`, error);
              return doctor; // Return doctor without details if fetching fails
            }
          })
        );

        setDoctors(doctorsWithDetails);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (doctorId) => {
    setSelectedDoctor(doctorId);
    setIsModalOpen(true);
    setAppointmentInfo(null); // Reset previous appointment info when opening the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAppointmentDate("");
    setSymptoms("");
  };

  const handleAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !symptoms) {
      alert("Please fill all fields to make an appointment");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/appointment", {
        patientId,
        doctorId: selectedDoctor,
        appointmentDate,
        symptoms,
      });

      // Extract appointment number and time from the response
      const { appointmentNumber, appointmentTime } = response.data;
      setAppointmentInfo({ appointmentNumber, appointmentTime });

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  return (
    <div className="doctor-list-container">
      <input
        type="text"
        placeholder="Search for doctors"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.userId} className="doctor-card">
            <h3>Dr.{doctor.firstName} {doctor.lastName}</h3>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Specialty:</strong> {doctor.specialty || "Not specified"}</p>
            <p><strong>Education:</strong> {doctor.education || "Not specified"}</p>
            <p><strong>Experience:</strong> {doctor.experience || "Not specified"}</p>
            <button onClick={() => openModal(doctor.userId)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            <h2>Book Appointment</h2>
            <input
              className="getdata"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <textarea
              className="getdata"
              placeholder="Describe your symptoms and add your phone number"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            ></textarea>
            <button className="butbtn" onClick={handleAppointment}>Submit</button>
            
            {/* Display appointment number and time if booking is successful */}
            {appointmentInfo && (
              <div className="appointment-info">
                <h3>Appointment Details</h3>
                <p><strong>Appointment Number:</strong> {appointmentInfo.appointmentNumber}</p>
                <p><strong>Appointment Time:</strong> {appointmentInfo.appointmentTime}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
