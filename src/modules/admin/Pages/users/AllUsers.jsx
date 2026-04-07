import { useOutletContext } from "react-router-dom";
import "./AllUsers.css";

const AllUsers = () => {
  const { users } = useOutletContext();

  return (
    <div>
      <h3>All Users</h3>

      {users.length === 0 ? (
        <p>No users added</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;
