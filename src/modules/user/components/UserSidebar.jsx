import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCheckSquare,
  FiFileText,
  FiUser,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import "./UserSidebar.css"; // Corrected CSS import

const UserSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  // ✅ User Role (can be dynamically set based on auth)
  const user = {
    role: "User", // For example, this role can be "User" as per your scenario
  };

  useEffect(() => {
    if (collapsed) setOpenMenu("");
  }, [collapsed]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <aside className={`sidebar ${collapsed ? "closed" : ""}`}>
      {/* LOGO */}
      <div className="logo">
        <span>E</span>
        {!collapsed && <h3>Employee Panel</h3>}
      </div>

      <ul className="menu">
        {/* ================= DASHBOARD ================= */}
        <li className={`menu-group ${openMenu === "Dashboard" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Dashboard")}>
            <div className="menu-item">
              <FiGrid />
              {!collapsed && <span>Dashboard</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={openMenu === "Dashboard" ? "rotate" : ""} />
            )}
          </div>

          {!collapsed && openMenu === "Dashboard" && (
            <ul className="submenu">
              <li>
                <NavLink to="/user/dashboard">Overview</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* ================= MY TASKS ================= */}
        <li>
          <NavLink to="/user/tasks" className="menu-row">
            <div className="menu-item">
              <FiCheckSquare />
              {!collapsed && <span>My Tasks</span>}
            </div>
          </NavLink>
        </li>

        {/* ================= MY REQUESTS ================= */}
        <li>
          <NavLink to="/user/requests" className="menu-row">
            <div className="menu-item">
              <FiFileText />
              {!collapsed && <span>My Requests</span>}
            </div>
          </NavLink>
        </li>

        {/* ================= MY REPORTS ================= */}
        <li>
          <NavLink to="/user/reports" className="menu-row">
            <div className="menu-item">
              <FiFileText />
              {!collapsed && <span>My Reports</span>}
            </div>
          </NavLink>
        </li>

        {/* ================= PROFILE ================= */}
        <li>
          <NavLink to="/user/profile" className="menu-row">
            <div className="menu-item">
              <FiUser />
              {!collapsed && <span>My Profile</span>}
            </div>
          </NavLink>
        </li>

        {/* ================= SETTINGS ================= */}
        <li>
          <NavLink to="/user/settings" className="menu-row">
            <div className="menu-item">
              <FiSettings />
              {!collapsed && <span>Settings</span>}
            </div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;