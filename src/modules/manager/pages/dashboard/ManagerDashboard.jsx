import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Manager Dashboard</h2>

      {/* CARDS */}
      <div className="cards">
        <div className="card">Team Size: 10</div>
        <div className="card">Pending Approvals: 4</div>
        <div className="card">Completed Tasks: 28</div>
      </div>

      {/* TABLE */}
      <h3>Team Members</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul</td>
            <td>Developer</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
