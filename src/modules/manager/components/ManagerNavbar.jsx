import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiBell, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import AuthContext from "../../../auth/context/AuthContext";
import "./ManagerNavbar.css";

const ManagerNavbar = ({ toggleSidebar, darkMode, setDarkMode }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "";
  }, [darkMode]);

  return (
    <header className="navbar">
      <div className="nav-left">
        <FiMenu className="menu-icon" onClick={toggleSidebar} />
        <h2>Manager Dashboard</h2>
      </div>

      <div className="nav-right">
        {/* Dark Mode Toggle */}
        {darkMode ? (
          <FiSun className="nav-icon" onClick={() => setDarkMode(false)} />
        ) : (
          <FiMoon className="nav-icon" onClick={() => setDarkMode(true)} />
        )}

        <FiBell className="nav-icon" />

        {/* Avatar */}
        <div
          className="avatar"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          {localStorage.getItem("profileImage") ? (
            <img
              src={localStorage.getItem("profileImage")}
              alt="Profile"
              className="avatar-img"
            />
          ) : (
            "J"
          )}
        </div>

        {/* Dropdown */}
        {openDropdown && (
          <div className="dropdown">
            <Link
              to="/manager/my-profile"
              className="dropdown-item"
              onClick={() => setOpenDropdown(false)}
            >
              My Profile
            </Link>

            <Link
              to="/manager/settings/general"
              className="dropdown-item"
              onClick={() => setOpenDropdown(false)}
            >
              Settings
            </Link>

            <Link
              to="/manager/help"
              className="dropdown-item"
              onClick={() => setOpenDropdown(false)}
            >
              Help
            </Link>

            <div className="dropdown-divider" />

            <div
              className="dropdown-item logout"
              onClick={() => {
                logout();
                setOpenDropdown(false);
              }}
            >
              <FiLogOut />
              <span>Log Out</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ManagerNavbar;