import React from "react";
import "./UserDashboard.css";

const dashboardData = [
  { title: "My Tasks", value: "8", description: "Active Tasks" },
  { title: "Pending Requests", value: "2", description: "Requests Waiting" },
  { title: "Reports Submitted", value: "12", description: "Reports" },
  { title: "Profile Status", value: "Complete", description: "All Set ✅" },
];

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Here’s what’s happening today</p>
      </div>

      <div className="card-container">
        {dashboardData.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{card.title}</h3>
            <div className="card-value">{card.value}</div>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;