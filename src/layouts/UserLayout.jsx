import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../modules/user/components/UserSidebar";
import UserNavbar from "../modules/user/components/UserNavbar";
import Footer from "../components/common/Footer"; // ✅ ADD THIS
import "./styles/UserLayout.css";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={`user-layout ${collapsed ? "collapsed" : ""} ${darkMode ? "dark" : ""}`}>
      
      {/* Sidebar */}
      <UserSidebar collapsed={collapsed} />

      {/* Main Section */}
      <div className="main-section">

        {/* Navbar */}
        <UserNavbar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Page Content */}
        <main className="content">
          <Outlet />
        </main>

        {/* ✅ Footer Added */}
        <Footer />

      </div>
    </div>
  );
};

export default UserLayout;