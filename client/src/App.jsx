import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/SignUp";
import Login from './component/LogIn';
import AdminMain from './component/Admin/AdminMain';
import DoctorMain from './component/Doctor/DoctorMain';
import PatientMain from "./component/Patient/HomeScreen";
import StaffMain from "./component/Staff/StaffMain";

let user;

function App() {
  const [count, setCount] = useState(0);

  try {
    user = JSON.parse(localStorage.getItem("role"));
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PatientMain/>} />
        <Route path="/signup" element={<Signup />} />

        {user && user.role === "admin" && <Route path="/*" element={<AdminMain />} />}
        {user && user.role === "doctor" && <Route path="/*" element={<DoctorMain />} />}
        {user && user.role === "patient" && <Route path="/*" element={<PatientMain />} />}
        {user && user.role === "staff" && <Route path="/*" element={<StaffMain />} />}
        
            
      </Routes>
    </Router> 
  );
}


export default App;

