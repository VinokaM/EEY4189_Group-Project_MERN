import React from 'react';
import PatientTopBar from "../Patient/PatientCom/PatientTopBar";
import PatientMenuBar from "../Patient/PatientCom/PatientMenuBar";
import PatientNavCom from "../Patient/PatientCom/PatientNavCom";
import Footer from './PatientCom/Footer';
import './home.css'; 

const HomeScreen = () => {
  return (
    <React.Fragment>
      {/* Heading section */}
      <section>
        <div className="patient-top-bar">
          <PatientTopBar />
        </div>
      </section>

      <section className='menu'>
        <div className="patient-menu-bar">
          <PatientMenuBar />
        </div>
      </section>

      <section>
        <div className="patient-nav-com">
          <PatientNavCom />
        </div>
      </section>
      <section>
        <div className="">
          <Footer />
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomeScreen;
