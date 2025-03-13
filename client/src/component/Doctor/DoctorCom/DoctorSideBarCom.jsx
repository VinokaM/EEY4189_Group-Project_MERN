import React from 'react';
import { SidebarData } from '../DoctorSideBarData';
import { NavLink } from 'react-router-dom';
import './sidebar.css'; 

const name = localStorage.getItem('firstName');
const email = localStorage.getItem('email');

const Sidebar = () => {
  return (
    <React.Fragment>
      <section>
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>{name}</h2>
            <h3>{email}</h3>
          </div>
          {SidebarData.map((item, index) => {
            return (
              <div key={index} className="title">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'active-link' : 'normal-link'
                  }
                >
                  <span className="icon">{item.icon}</span>
                  <span className="title">{item.title}</span>
                </NavLink>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Sidebar;
