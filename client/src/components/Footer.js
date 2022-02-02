import NotificationsNone from '@mui/icons-material/NotificationsNone';
import React from 'react'
import "./Footer.css"
import Logo2 from '../2.png'

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: "space-around", textAlign: "start" }}>
          {/* Column1 */}
          <div>
            <a href="/" style={{ margin: '0px' }}>
              <img src={Logo2} alt="psa10 logo" height="50px" />
            </a>
            <h3>A new way to collect</h3>
          </div>
          {/* column2 */}
          <div style={{ display: 'inline-flex', justifyContent: "space-evenly", textAlign: "center", marginTop: '20px' }}>
            <p>
              <a href="/about" style={{ textDecoration: 'none' }}>
                PSA 10
              </a>
            </p>
          </div>
          {/* Column3 */}
          <div style={{ display: 'inline-flex', justifyContent: "space-evenly", textAlign: "center", marginTop: '20px' }} >
            <p>
              <a href="/faq" style={{ textDecoration: 'none' }}>
                Info
              </a>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h6 style={{ display: 'flex', textAlign: 'start', color: '#B8B8B8' }}>
            Copyright &copy;{new Date().getFullYear()} DevPoint Studios LLC. All rights reserved
          </h6>
        </div>
      </div>
    </div >
  );
};

export default Footer;
