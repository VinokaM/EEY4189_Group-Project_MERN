import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  const name = localStorage.getItem('firstName');

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location = "/";
    } else {
      console.warn("User is not logged in");
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        {isAuthenticated ? (
          <h1>Hi,{name}</h1>
          
        ) : (
          <h1>CareConnect</h1>
        )}
  
        {isAuthenticated ? (
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className={styles.new_btn}>
              login
            </Link>
            <Link to="/signup" className={styles.new_btn}>
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Main;
