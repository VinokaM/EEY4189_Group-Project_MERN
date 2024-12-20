import React, { useState, useEffect } from "react";
import axios from "axios";
import './DoctorDetailsForm.css';

const DoctorDetailsForm = () => {
  const [specialty, setSpecialty] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch existing details for the doctor
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doctor/details/${userId}`);
        const { specialty, education, experience } = response.data;

        // If details are found, populate the form fields
        if (response.data) {
          setSpecialty(specialty);
          setEducation(education);
          setExperience(experience);
          setIsEditing(true); // Set the editing state to true
        }
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing details
        const response = await axios.put(`http://localhost:8080/doctor/update-details/${userId}`, {
          specialty,
          education,
          experience,
        });
        setMessage(response.data.message);
      } else {
        // Add new details
        const response = await axios.post("http://localhost:8080/doctor/add-details", {
          userId,
          specialty,
          education,
          experience,
        });
        setMessage(response.data.message);
        setIsEditing(true); // Switch to editing mode
      }
    } catch (error) {
      setMessage("Failed to save details. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="doctor-details-form">
      <h2>{isEditing ? "Edit Your Details" : "Add Your Details"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Specialty:
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </label>
        <label>
          Education:
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </label>
        <label>
          Experience:
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DoctorDetailsForm;
