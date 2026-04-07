import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../modules/admin/components/AdminSidebar";
import Navbar from "../modules/admin/components/AdminNavbar";
import Footer from "../components/common/Footer";
import "./styles/AdminLayout.css"; // Import CSS for AdminLayout

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""} ${darkMode ? "dark" : ""}`}>

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Section */}
      <div className="main-section">

        {/* Top Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Page Content (VERY IMPORTANT: Outlet for nested routes) */}
        <main className="content">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;