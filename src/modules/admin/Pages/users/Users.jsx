import { Outlet } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h2>User Management</h2>
      <Outlet context={{ users, setUsers }} />
    </div>
  );
};

export default Users;
