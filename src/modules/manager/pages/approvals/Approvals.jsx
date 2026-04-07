import React, { useState } from "react";
import "./Approvals.css";

const Approvals = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      employee: "Rahul Sharma",
      type: "Leave Request",
      date: "10 Feb 2026",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Priya Singh",
      type: "WFH Request",
      date: "12 Feb 2026",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: "Approved" } : req
    );
    setRequests(updated);
  };

  const handleReject = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: "Rejected" } : req
    );
    setRequests(updated);
  };

  return (
    <div className="approvals-container">
      <h2>Approvals</h2>

      <table className="approvals-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Request Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.employee}</td>
              <td>{req.type}</td>
              <td>{req.date}</td>
              <td>
                <span className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(req.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(req.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
