import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StaffAppointments from "../StaffSideBar/StaffAppointments";
import Calculate from "../../Admin/AdminSideBar/Calculate";
import SearchUser from "../../Admin/AdminSideBar/SearchUser";
import AddDoctor from "../StaffSideBar/AddDoctor";



const NavPage = () => {

    
    return (
        <React.Fragment>
        <section>
          <Routes>
          <Route path="/*" element={<Calculate />} />
          <Route path="/allapp" element={<StaffAppointments />} />
          <Route path="/searchall" element={<SearchUser />} />
          <Route path="/adddoc" element={<AddDoctor />} />
          
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;