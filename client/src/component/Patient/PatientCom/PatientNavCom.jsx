import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorList from "../PatientMenuBar/DoctorList";
import HomePage from "../PatientMenuBar/HomePage";
import PatientAppointments from "../PatientMenuBar/PatientAppointments";
import PatientDoctorChat from "../PatientMenuBar/PatientDoctorChat";



const NavPage = () => {

    
    return (
        <React.Fragment>
        <section>
          <Routes>
          <Route path="/*" element={<HomePage />} /> 
          <Route path="/doctor" element={<DoctorList />} /> 
          <Route path="/patientApp" element={<PatientAppointments />} /> 
          <Route path="/pmessage" element={<PatientDoctorChat />} /> 
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;