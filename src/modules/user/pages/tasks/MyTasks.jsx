import React from "react";

const MyTasks = () => {
  const tasks = [
    { id: 1, title: "Update Website UI", status: "In Progress" },
    { id: 2, title: "Fix Login Bug", status: "Pending" },
    { id: 3, title: "Submit Report", status: "Completed" },
  ];

  return (
    <div>
      <h2>My Tasks</h2>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;