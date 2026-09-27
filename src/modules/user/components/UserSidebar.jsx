import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCheckSquare,
  FiFileText,
  FiUser,
  FiSettings,
  FiBell,
  FiCompass,
  FiChevronDown,
} from "react-icons/fi";
import "./UserSidebar.css";

const UserSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  const activeMenu = collapsed ? "" : openMenu;

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

        {/* Dashboard */}
        <li className={`menu-group ${activeMenu === "Dashboard" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Dashboard")}>
            <div className="menu-item">
              <FiGrid />
              {!collapsed && <span>Dashboard</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Dashboard" ? "rotate" : ""} />
            )}
          </div>

          {!collapsed && activeMenu === "Dashboard" && (
            <ul className="submenu">
              <li>
                <NavLink to="/user/dashboard">Overview</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Tasks */}
        <li>
          <NavLink to="/user/tasks" className="menu-row">
            <div className="menu-item">
              <FiCheckSquare />
              {!collapsed && <span>My Tasks</span>}
            </div>
          </NavLink>
        </li>

        {/* Requests */}
        <li>
          <NavLink to="/user/requests" className="menu-row">
            <div className="menu-item">
              <FiFileText />
              {!collapsed && <span>My Requests</span>}
            </div>
          </NavLink>
        </li>

        {/* Events & Notices */}
        <li>
          <NavLink to="/user/events" className="menu-row">
            <div className="menu-item">
              <FiBell />
              {!collapsed && <span>Events & Notices</span>}
            </div>
          </NavLink>
        </li>

        {/* Tour Guide */}
        <li>
          <NavLink to="/user/tour-guide" className="menu-row">
            <div className="menu-item">
              <FiCompass />
              {!collapsed && <span>Tour Guide</span>}
            </div>
          </NavLink>
        </li>

        {/* Reports */}
        <li>
          <NavLink to="/user/reports" className="menu-row">
            <div className="menu-item">
              <FiFileText />
              {!collapsed && <span>My Reports</span>}
            </div>
          </NavLink>
        </li>

        {/* Profile */}
        <li>
          <NavLink to="/user/profile" className="menu-row">
            <div className="menu-item">
              <FiUser />
              {!collapsed && <span>My Profile</span>}
            </div>
          </NavLink>
        </li>

        {/* Settings */}
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