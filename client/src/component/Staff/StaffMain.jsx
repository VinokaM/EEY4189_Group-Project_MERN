import React from 'react';
import StaffTopBar from '../Staff/StaffCom/StaffTopBar';
import StaffSideBar from '../Staff/StaffCom/StaffSideBarCom';;
import StaffNavCom from '../Staff/StaffCom/StaffNavCom';
import './staffmain.css'; 

const StaffMain = () => {
  return (
    <React.Fragment>
      {/* Heading section */}
      <section>
        <div>
          <StaffTopBar />
        </div>
      </section>

      {/* Sidebar and content section */}
      <section>
        <div className="grid-container">
          <div className="sidebar">
            <StaffSideBar />
          </div>

          <div className="content-area">
            <StaffNavCom />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default StaffMain;
