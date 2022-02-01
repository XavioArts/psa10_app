import NotificationsNone from '@mui/icons-material/NotificationsNone';
import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className="main-footer">
      <div>
        <div style={{ display: 'flex', justifyContent: "space-around", textAlign: "start" }}>
          {/* Column1 */}
          <div>
            <h4>Footer</h4>
            <h3>A new way to collect</h3>
          </div>
          {/* column2 */}
          <div style={{ display: 'inline-flex', justifyContent: "space-evenly", textAlign: "center" }}>
            <p>
              <a href="/" style={{ textDecoration: 'none' }}>
                PSA 10
              </a>
            </p>
          </div>
          {/* Column3 */}
          <div style={{ display: 'inline-flex', justifyContent: "space-evenly", textAlign: "center" }} >
            <p>
              <a href="" style={{ textDecoration: 'none' }}>
                Info
              </a>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h6 style={{ paddingBottom: '1em', display: 'flex', textAlign: 'start', color: '#B8B8B8' }}>
            Copyright &copy;{new Date().getFullYear()} DevPoint Studios LLC. All rights reserved
          </h6>
        </div>
      </div>
    </div >
  );
};

export default Footer;
