import React from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome Back 👋</h2>

      <div className="card-container">

        <div className="dashboard-card">
          <h3>My Tasks</h3>
          <p>8 Active Tasks</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Requests</h3>
          <p>2 Requests Waiting</p>
        </div>

        <div className="dashboard-card">
          <h3>Reports Submitted</h3>
          <p>12 Reports</p>
        </div>

        <div className="dashboard-card">
          <h3>Profile Status</h3>
          <p>Complete ✅</p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;