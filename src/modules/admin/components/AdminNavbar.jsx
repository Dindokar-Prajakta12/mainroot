import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiLogOut
} from "react-icons/fi";
import AuthContext from "../../../auth/context/AuthContext";
import { ThemeContext } from "../../../Context/ThemeContext";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 
 const { darkMode, setDarkMode } = useContext(ThemeContext); 


  /* ===== CLOSE DROPDOWN ON OUTSIDE CLICK ===== */
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
        <h2>Dashboard</h2>
      </div>

      <div className="nav-right" ref={dropdownRef}>
        {/* 🌗 THEME TOGGLE */}
        {darkMode ? (
          <FiSun
            className="nav-icon"
            onClick={() => setDarkMode(false)}
            title="Switch to Light Mode"
          />
        ) : (
          <FiMoon
            className="nav-icon"
            onClick={() => setDarkMode(true)}
            title="Switch to Dark Mode"
          />
        )}

        <FiBell className="nav-icon" />

        {/* AVATAR */}
        <div className="avatar" onClick={() => setOpen(!open)}>
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

        {/* DROPDOWN */}
        {open && (
          <div className="dropdown">
            <Link
              to="/admin/my-profile"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              My Profile
            </Link>

            <Link
              to="/admin/settings/general"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>

            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/admin/help");
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

export default Navbar;