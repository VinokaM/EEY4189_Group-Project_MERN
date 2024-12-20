import React from 'react';
import DoctorTopBar from "./DoctorCom/DoctorTopBar";
import DoctorNavigation from "./DoctorCom/DoctorNavCom";
import DoctorSideBar from "./DoctorCom/DoctorSideBarCom"
import './doctormain.css'; 

const DoctorMain = () => {
  return (
    <React.Fragment>
      {/* Heading section */}
      <section>
        <div>
          <DoctorTopBar />
        </div>
      </section>

      {/* Sidebar and content section */}
      <section>
        <div className="grid-container">
          <div className="sidebar">
            <DoctorSideBar />
          </div>

          <div className="content-area">
            <DoctorNavigation />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default DoctorMain;
