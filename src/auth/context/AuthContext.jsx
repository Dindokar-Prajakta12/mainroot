import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken } from "../utils/token";
import { roleRedirect } from "../utils/roleRedirect";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      try {
        const savedUser = JSON.parse(storedUser);
        setUser(savedUser);
        localStorage.setItem("role", savedUser.role);
      } catch (error) {
        removeToken();
        localStorage.removeItem("authUser");
      }
    }
  }, []);

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