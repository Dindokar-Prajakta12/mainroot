import { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../modules/manager/components/ManagerSidebar";
import ManagerNavbar from "../modules/manager/components/ManagerNavbar";
import Footer from "../components/common/Footer";
import "./styles/ManagerLayout.css"; // Import CSS for ManagerLayout

const ManagerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`manager-layout 
        ${collapsed ? "collapsed" : ""} 
        ${darkMode ? "dark" : ""}`}
    >
      {/* Sidebar */}
      <ManagerSidebar collapsed={collapsed} />

      {/* Main Section */}
      <div className="main-section">
        <ManagerNavbar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Page Content */}
        <main className="content">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ManagerLayout;