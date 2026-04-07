import React from "react";

const Team = () => {
  const teamMembers = [
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer" },
    { id: 2, name: "Priya Singh", role: "Backend Developer" },
    { id: 3, name: "Amit Patel", role: "UI/UX Designer" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manager Team</h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>

        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td style={tdStyle}>{member.name}</td>
              <td style={tdStyle}>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Team;   // ✅ VERY IMPORTANT
