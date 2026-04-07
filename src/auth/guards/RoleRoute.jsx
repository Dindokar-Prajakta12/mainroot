import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// RoleRoute component ensures that the user has the correct role
const RoleRoute = ({ element, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === role ? element : <Navigate to="/unauthorized" />;
};

export default RoleRoute;