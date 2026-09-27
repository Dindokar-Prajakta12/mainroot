import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken } from "../utils/token";
import { roleRedirect } from "../utils/roleRedirect";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("authUser");

    if (!token || !storedUser) {
      return null;
    }

    try {
      const savedUser = JSON.parse(storedUser);
      localStorage.setItem("role", savedUser.role);
      return savedUser;
    } catch {
      removeToken();
      localStorage.removeItem("authUser");
      return null;
    }
  });
  const navigate = useNavigate();

  const login = (token, userData) => {
    setToken(token);
    if (userData) {
      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      localStorage.setItem("role", userData.role);
      navigate(roleRedirect(userData.role));
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("role");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;