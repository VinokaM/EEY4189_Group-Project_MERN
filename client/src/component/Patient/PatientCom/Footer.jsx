import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: About */}
        <div className="footer-section">
          <h2 className="footerMain">CareConnect</h2>
          <p>
            CareConnect is your trusted healthcare platform, connecting patients with healthcare professionals seamlessly. Our mission is to ensure accessible healthcare for everyone.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-section links">
          <h2 className="footerMain">Quick Links</h2>
          <p className='footerlink'>Home</p>
          <p className='footerlink'>Our Doctor</p>
          <p className='footerlink'>My Appointments</p>
          <p className='footerlink'>Message</p>
        </div>

        {/* Right Section: Contact & Social Media */}
        <div className="footer-section contact">
          <h2 className="footerMain">Contact Us</h2>
          <p>Himantha Hadunnetti</p>
          <p>Vinoka Malith</p>
          <p>Neranji Edirisooriya</p>
          <p>Wimansa Kalpani</p>
          <p>Email: support@careconnect.com</p>
          <p>Phone: +123 456 7890</p>
          
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
