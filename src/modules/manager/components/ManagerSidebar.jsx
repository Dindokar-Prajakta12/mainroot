
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiCheckCircle,
  FiBarChart2,
  FiChevronDown,
  FiUser,
  FiBell,
  FiCompass,
} from "react-icons/fi";
import "./ManagerSidebar.css"; // Same CSS as Admin Sidebar

const ManagerSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  // TEMP role (later from auth)
  const user = { role: "Manager" };

  const activeMenu = collapsed ? "" : openMenu;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <aside className={`sidebar ${collapsed ? "closed" : ""}`}>
      {/* LOGO */}
      <div className="logo">
        <span>M</span>
        {!collapsed && <h3>Manager</h3>}
      </div>

      <ul className="menu">
        {/* DASHBOARD */}
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
                <NavLink to="/manager/dashboard">Main</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* TEAM */}
        <li className={`menu-group ${activeMenu === "Team" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Team")}>
            <div className="menu-item">
              <FiUsers />
              {!collapsed && <span>Team</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Team" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && activeMenu === "Team" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/team">All Team Members</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* APPROVALS */}
        <li className={`menu-group ${activeMenu === "Approvals" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Approvals")}>
            <div className="menu-item">
              <FiCheckCircle />
              {!collapsed && <span>Approvals</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Approvals" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && activeMenu === "Approvals" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/approvals">Pending Approvals</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* REPORTS */}
        <li className={`menu-group ${activeMenu === "Reports" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Reports")}>
            <div className="menu-item">
              <FiBarChart2 />
              {!collapsed && <span>Reports</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Reports" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && activeMenu === "Reports" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/reports">Reports Overview</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* EVENTS & NOTICES */}
        <li className={`menu-group ${activeMenu === "Events" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Events")}>
            <div className="menu-item">
              <FiBell />
              {!collapsed && <span>Events</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Events" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && activeMenu === "Events" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/events">Events & Notices</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* TOUR GUIDE */}
        <li>
          <NavLink to="/manager/tour-guide" className="menu-row">
            <div className="menu-item">
              <FiCompass />
              {!collapsed && <span>Tour Guide</span>}
            </div>
          </NavLink>
        </li>

        {/* PROFILE */}
        <li className={`menu-group ${activeMenu === "Profile" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Profile")}>
            <div className="menu-item">
              <FiUser />
              {!collapsed && <span>Profile</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={activeMenu === "Profile" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && activeMenu === "Profile" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/manager/change-password">
                  Change Password
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default ManagerSidebar;