import React from "react";
import "./MyReports.css";
const MyReports = () => {
  const reports = [
    { id: 1, name: "January Performance", date: "01-01-2026" },
    { id: 2, name: "February Performance", date: "01-02-2026" },
  ];

  return (
    <div>
      <h2>My Reports</h2>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Report Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.name}</td>
                <td>{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReports;