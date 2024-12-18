import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddUser from "../AdminSideBar/AddUser"
import Calculate from "../AdminSideBar/Calculate"
import SearchUser from "../AdminSideBar/SearchUser"
import DeleteUser from "../AdminSideBar/DeleteUser"


const NavPage = () => {

    
    return (
        <React.Fragment>
        <section>
          <Routes>
          <Route path="/*" element={<Calculate />} />
          <Route path="/adduser" element={<AddUser />} /> 
          <Route path="/searchuser" element={<SearchUser />} />  
          <Route path="/deleteuser" element={<DeleteUser />} /> 
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;