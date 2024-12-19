<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/SignUp";
import Login from './component/LogIn';
import AdminMain from './component/Admin/AdminMain';
import DoctorMain from './component/Doctor/DoctorMain';
import PatientMain from "./component/Patient/HomeScreen";
import StaffMain from "./component/Staff/StaffMain";

let user;
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  try {
    user = JSON.parse(localStorage.getItem("role"));
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    
    return <Navigate to="/login" />;
  }

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
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

>>>>>>> Stashed changes
