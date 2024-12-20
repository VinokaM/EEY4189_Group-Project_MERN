import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorAppointments from "../DoctorSideBar/DoctorAppointments";
import DoctorDetailsForm from "../DoctorSideBar/DoctorDetailsForm";
import DoctorChat from "../DoctorSideBar/DoctorChat";



const NavPage = () => {

    
    return (
        <React.Fragment>
        <section>
          <Routes>
          <Route path="/appointments" element={<DoctorAppointments />} /> 
          <Route path="/doctorprofile" element={<DoctorDetailsForm />} /> 
          <Route path="/chat" element={<DoctorChat />} />
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;