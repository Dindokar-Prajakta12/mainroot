import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../modules/admin/components/AdminSidebar";
import Navbar from "../modules/admin/components/AdminNavbar";
import Footer from "../components/common/Footer";
import { ThemeContext } from "../Context/ThemeContext";
import "./styles/AdminLayout.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} />

      <div className="main-section">
        <Navbar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;