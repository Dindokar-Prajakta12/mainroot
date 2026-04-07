import { Navigate } from "react-router-dom";
import "./SystemUsage.css";

const SystemUsage = () => {
  // TEMP: later replace with AuthContext / JWT
  const user = {
    role: "Admin",
  };

  // 🔒 Protect page
  if (user.role !== "Admin") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="usage-container">
      <h2 className="usage-title">System Usage</h2>

      {/* Top cards */}
      <div className="usage-cards">
        <div className="usage-card">
          <h3>Total Users</h3>
          <p>120</p>
        </div>

        <div className="usage-card">
          <h3>Active Users</h3>
          <p>86</p>
        </div>

        <div className="usage-card">
          <h3>Logins Today</h3>
          <p>42</p>
        </div>

        <div className="usage-card">
          <h3>Reports Generated</h3>
          <p>18</p>
        </div>
      </div>

      {/* Table */}
      <h3 className="section-title">Recent Activity</h3>
      <table className="usage-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul</td>
            <td>Admin</td>
            <td>Today 10:12 AM</td>
            <td>Viewed Dashboard</td>
          </tr>
          <tr>
            <td>Anita</td>
            <td>Manager</td>
            <td>Yesterday 6:45 PM</td>
            <td>Edited User</td>
          </tr>
          <tr>
            <td>Vijay</td>
            <td>User</td>
            <td>Yesterday 3:10 PM</td>
            <td>Viewed Report</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SystemUsage;
