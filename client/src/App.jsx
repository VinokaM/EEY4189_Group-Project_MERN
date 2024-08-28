import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/SignUp";
import Login from './component/LogIn';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

