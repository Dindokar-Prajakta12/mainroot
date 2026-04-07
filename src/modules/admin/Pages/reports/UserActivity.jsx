import "./UserActivity.css";

const UserActivity = () => {
  return (
    <div className="report-container">
      <h2 className="report-title">User Activity</h2>

      {/* Filters */}
      <div className="report-filters">
        <select>
          <option>All Roles</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>User</option>
        </select>

        <button className="export-btn">Export PDF</button>
      </div>

      {/* Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Action</th>
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
        </tbody>
      </table>
    </div>
  );
};

export default UserActivity;
