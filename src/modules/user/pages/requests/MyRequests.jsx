import React from "react";
import "./MyRequests.css";
const MyRequests = () => {
  const requests = [
    { id: 1, type: "Leave Request", status: "Pending" },
    { id: 2, type: "Work From Home", status: "Approved" },
  ];

  return (
    <div>
      <h2>My Requests</h2>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Request Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id}>
                <td>{index + 1}</td>
                <td>{req.type}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequests;