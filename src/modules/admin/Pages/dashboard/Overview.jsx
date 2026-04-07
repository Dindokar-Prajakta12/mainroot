import React from "react";
import "./Overview.css"; // Add the corresponding CSS file for styling

const Overview = () => {
  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard Overview</h2>

      <div className="cards">
        <div className="card">
          <h3>120</h3>
          <p>Total Users</p>
        </div>
        <div className="card">
          <h3>10</h3>
          <p>Managers</p>
        </div>
        <div className="card">
          <h3>110</h3>
          <p>Employees</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;