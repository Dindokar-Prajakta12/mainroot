import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiFileText,
  FiUser,
  FiBell,
  FiCompass,
  FiChevronDown,
} from "react-icons/fi";
import "../styles/sidebar.css"; // Corrected CSS import

const Sidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  // 🔐 TEMP user role (later move to AuthContext / JWT)
  const user = {
    role: "Admin", // Admin | Manager | User
  };

  const activeMenu = collapsed ? "" : openMenu;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <aside className={`sidebar ${collapsed ? "closed" : ""}`}>
      {/* LOGO */}
      <div className="logo">
        <span>D</span>
        {!collapsed && <h3>Divya</h3>}
      </div>

      <ul className="menu">
        {/* ================= DASHBOARD ================= */}
        <li className={`menu-group ${activeMenu === "Dashboard" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Dashboard")}>
            <div className="menu-item">
              <FiGrid />
              {!collapsed && <span>Dashboard</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Dashboard" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Dashboard" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/dashboard/overview">Overview</NavLink>
              </li>
              <li>
                <NavLink to="/admin/dashboard/analytics">Analytics</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* ================= USERS ================= */}
        <li className={`menu-group ${activeMenu === "Users" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Users")}>
            <div className="menu-item">
              <FiUsers />
              {!collapsed && <span>User Management</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Users" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Users" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/users/all">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/users/add">Add User</NavLink>
              </li>

              {user.role === "Admin" && (
                <li>
                  <NavLink to="/admin/roles-permissions">Permissions</NavLink>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* ================= REPORTS ================= */}
        <li className={`menu-group ${activeMenu === "Reports" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Reports")}>
            <div className="menu-item">
              <FiBarChart2 />
              {!collapsed && <span>Reports</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Reports" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Reports" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/reports/sales">Sales Report</NavLink>
              </li>
              <li>
                <NavLink to="/admin/reports/activity">User Activity</NavLink>
              </li>

              {user.role === "Admin" && (
                <li>
                  <NavLink to="/admin/system-usage">System Usage</NavLink>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* ================= SETTINGS ================= */}
        <li className={`menu-group ${activeMenu === "Settings" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Settings")}>
            <div className="menu-item">
              <FiSettings />
              {!collapsed && <span>Settings</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Settings" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Settings" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/settings/security">Security</NavLink>
              </li>
              <li>
                <NavLink to="/admin/settings/notifications">Notifications</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* ================= LOGS ================= */}
        <li className={`menu-group ${activeMenu === "Logs" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Logs")}>
            <div className="menu-item">
              <FiFileText />
              {!collapsed && <span>Logs</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Logs" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Logs" && (
            <ul className="submenu">
              <li>Login Logs</li>
              <li>Action History</li>
            </ul>
          )}
        </li>

        {/* ================= EVENTS ================= */}
        <li className={`menu-group ${activeMenu === "Events" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Events")}>
            <div className="menu-item">
              <FiBell />
              {!collapsed && <span>Events</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Events" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Events" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/events">Events & Notices</NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* ================= TOUR GUIDE ================= */}
        <li>
          <NavLink to="/admin/tour-guide" className="menu-row">
            <div className="menu-item">
              <FiCompass />
              {!collapsed && <span>Tour Guide</span>}
            </div>
          </NavLink>
        </li>

        {/* ================= PROFILE ================= */}
        <li className={`menu-group ${activeMenu === "Profile" ? "active" : ""}`}>
          <div className="menu-row" onClick={() => toggleMenu("Profile")}>
            <div className="menu-item">
              <FiUser />
              {!collapsed && <span>Profile</span>}
            </div>
            {!collapsed && (
              <FiChevronDown
                className={activeMenu === "Profile" ? "rotate" : ""}
              />
            )}
          </div>

          {!collapsed && activeMenu === "Profile" && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/profile">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/admin/change-password">Change Password</NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;