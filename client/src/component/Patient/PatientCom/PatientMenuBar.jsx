import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SidebarData } from '../MenuData';
import './menubar.css';

const Menubar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [activeIndex, setActiveIndex] = useState(null);

  const handleNavigation = (path,index) => {
    if (isAuthenticated || path === "/") {
      navigate(path);
      setActiveIndex(index);
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <React.Fragment>
      <section>
        <div className="pmenubar">
          {SidebarData.map((item, index) => (
            <div
              key={index}
              className={`${activeIndex === index ? 'pactive' : 'pnormal'}`}
              onClick={() => handleNavigation(item.path, index)}
            >
              <span className="ptitle">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Menubar;
