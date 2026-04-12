import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { ThemeContext } from "../../../Context/ThemeContext";
import AuthContext from "../../../auth/context/AuthContext";
import "./UserNavbar.css";

const UserNavbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
 const { darkMode, setDarkMode } = useContext(ThemeContext); 
  // Apply dark mode to body


  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-left">
        <FiMenu className="menu-icon" onClick={toggleSidebar} />
        <h2>Employee Dashboard</h2>
      </div>

      <div className="nav-right" ref={dropdownRef}>
        
        {/* Dark Mode Toggle */}
        {darkMode ? (
          <FiSun className="nav-icon" onClick={() => setDarkMode(false)} />
        ) : (
          <FiMoon className="nav-icon" onClick={() => setDarkMode(true)} />
        )}

        <FiBell className="nav-icon" />

        {/* Avatar */}
        <div className="avatar" onClick={() => setOpen(!open)}>
          {localStorage.getItem("profileImage") ? (
            <img
              src={localStorage.getItem("profileImage")}
              alt="Profile"
              className="avatar-img"
            />
          ) : (
            "E"
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="dropdown">
            <Link to="/user/profile" className="dropdown-item" onClick={() => setOpen(false)}>
              My Profile
            </Link>

            <Link to="/user/settings" className="dropdown-item" onClick={() => setOpen(false)}>
              Settings
            </Link>

            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/user/help");
                setOpen(false);
              }}
            >
              Help
            </div>

            <div className="dropdown-divider" />

            <div
              className="dropdown-item logout"
              onClick={() => {
                logout();
                setOpen(false);
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

export default UserNavbar;