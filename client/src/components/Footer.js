import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className="main-footer">
      <div style={{ gridRow: 1 }}>
        <div style={{ display: 'inline-flex', justifyContent: "space-between", textAlign: "start" }}>
          {/* Column1 */}
          <div>
            <h4>Footer</h4>
            <h3>A new way to collect</h3>
          </div>
          {/* column2 */}
          <div style={{ display: 'flex', justifyContent: "space-between", textAlign: "center" }}>
            <p>PSA 10</p>
          </div>
          {/* Column3 */}
          <div style={{ display: 'flex', justifyContent: "space-between", textAlign: "center" }} >
            <p>Info</p>
          </div>
        </div>
        <hr />
        <div>
          <p style={{ textAlign: 'start' }}>
            Copyright &copy;{new Date().getFullYear()} DevPoint Studios LLC. All rights reserved
          </p>
        </div>
      </div>
    </div >
  );
};

export default Footer; 