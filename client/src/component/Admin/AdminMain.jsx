import React from 'react';
import AdminTopBar from '../Admin/AdminCom/AdminTopBar';
import AdminSideBar from '../Admin/AdminCom/AdminSideBarCom';
import AdminNavigation from '../Admin/AdminCom/AdminNavCom';
import './adminmain.css'; 

const AdminMain = () => {
  return (
    <React.Fragment>
      {/* Heading section */}
      <section>
        <div>
          <AdminTopBar />
        </div>
      </section>

      {/* Sidebar and content section */}
      <section>
        <div className="grid-container">
          <div className="sidebar">
            <AdminSideBar />
          </div>

          <div className="content-area">
            <AdminNavigation />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AdminMain;
