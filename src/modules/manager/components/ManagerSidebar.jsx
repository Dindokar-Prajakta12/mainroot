
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiCheckCircle,
  FiBarChart2,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import "./ManagerSidebar.css"; // Same CSS as Admin Sidebar

const ManagerSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  // TEMP role (later from auth)
  const user = { role: "Manager" };

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
        <span>M</span>
        {!collapsed && <h3>Manager</h3>}
      </div>

      <ul className="menu">
        {/* DASHBOARD */}
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
                <NavLink to="/manager/dashboard">Main</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* TEAM */}
        <li className={`menu-group ${openMenu === "Team" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Team")}>
            <div className="menu-item">
              <FiUsers />
              {!collapsed && <span>Team</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={openMenu === "Team" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && openMenu === "Team" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/team">All Team Members</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* APPROVALS */}
        <li className={`menu-group ${openMenu === "Approvals" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Approvals")}>
            <div className="menu-item">
              <FiCheckCircle />
              {!collapsed && <span>Approvals</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={openMenu === "Approvals" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && openMenu === "Approvals" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/approvals">Pending Approvals</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* REPORTS */}
        <li className={`menu-group ${openMenu === "Reports" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Reports")}>
            <div className="menu-item">
              <FiBarChart2 />
              {!collapsed && <span>Reports</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={openMenu === "Reports" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && openMenu === "Reports" && (
            <ul className="submenu">
              <li>
                <NavLink to="/manager/reports">Reports Overview</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* PROFILE */}
        <li className={`menu-group ${openMenu === "Profile" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Profile")}>
            <div className="menu-item">
              <FiUser />
              {!collapsed && <span>Profile</span>}
            </div>
            {!collapsed && (
              <FiChevronDown className={openMenu === "Profile" ? "rotate" : ""} />
            )}
          </div>
          {!collapsed && openMenu === "Profile" && (
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