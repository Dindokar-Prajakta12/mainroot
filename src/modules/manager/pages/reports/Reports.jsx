import React from "react";
import "./Reports.css";

const Reports = () => {
  const reportsData = [
    {
      id: 1,
      title: "Monthly Performance Report",
      date: "01 Feb 2026",
      status: "Completed",
    },
    {
      id: 2,
      title: "Team Productivity Report",
      date: "05 Feb 2026",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Leave Summary Report",
      date: "08 Feb 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>

      {/* Summary Cards */}
      <div className="reports-cards">
        <div className="report-card">
          <h3>12</h3>
          <p>Total Reports</p>
        </div>

        <div className="report-card">
          <h3>8</h3>
          <p>Completed</p>
        </div>

        <div className="report-card">
          <h3>4</h3>
          <p>In Progress</p>
        </div>
      </div>

      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Date Generated</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <td>{report.title}</td>
              <td>{report.date}</td>
              <td>
                <span className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
                  {report.status}
                </span>
              </td>
              <td>
                <button className="view-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
