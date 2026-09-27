import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { ThemeContext } from "../../../Context/ThemeContext";
import AuthContext from "../../../auth/context/AuthContext";
import request from "../../../api/api";
import "./UserNavbar.css";

const UserNavbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const previousUnreadRef = useRef(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const refreshNotifications = async () => {
    try {
      const [items, unread] = await Promise.all([
        request("/api/tasks/notifications/"),
        request("/api/tasks/notifications/unread-count/"),
      ]);

      const nextUnreadCount = Number(unread?.unread_count || 0);
      const previousUnreadCount = previousUnreadRef.current;

      setNotifications(Array.isArray(items) ? items : []);
      setUnreadCount(nextUnreadCount);

      if (previousUnreadCount > 0 && nextUnreadCount > previousUnreadCount) {
        setToastMessage("You have new notifications.");
        window.setTimeout(() => setToastMessage(""), 3500);
      }

      previousUnreadRef.current = nextUnreadCount;
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadNotifications = () => {
      void refreshNotifications();
    };

    const timer = window.setInterval(() => {
      void refreshNotifications();
    }, 30000);

    const timeoutId = window.setTimeout(loadNotifications, 0);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(timer);
    };
  }, [user]);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.hostname === "localhost" ? "127.0.0.1" : window.location.hostname;
    const ws = new WebSocket(`${protocol}//${host}:8000/ws/notifications/`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data || "{}");
      if (data?.message) {
        setToastMessage(data.message);
        window.setTimeout(() => setToastMessage(""), 4000);
        refreshNotifications();
      }
    };

    return () => ws.close();
  }, []);

  const handleNotificationClick = async (item) => {
    if (!item.is_read) {
      try {
        await request(`/api/tasks/notifications/${item.id}/read/`, { method: "PATCH" });
        await refreshNotifications();
      } catch (error) {
        // Ignore read-state errors for the UI
      }
    }
  };

  // Apply dark mode to body


  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setNotificationOpen(false);
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

        <button
          className="notification-button"
          type="button"
          title="Notifications"
          onClick={() => {
            setNotificationOpen(!notificationOpen);
            setOpen(false);
          }}
        >
          <FiBell className="nav-icon" />
          <span className="notification-badge">{unreadCount}</span>
        </button>

        {toastMessage && (
          <div style={{ position: "fixed", top: 12, right: 18, zIndex: 1200, background: "#111827", color: "#fff", padding: "10px 14px", borderRadius: 10, boxShadow: "0 10px 20px rgba(15,23,42,0.25)" }}>
            {toastMessage}
          </div>
        )}

        {toastMessage && (
          <div style={{ position: "fixed", top: 12, right: 18, zIndex: 1200, background: "#111827", color: "#fff", padding: "10px 14px", borderRadius: 10, boxShadow: "0 10px 20px rgba(15,23,42,0.25)" }}>
            {toastMessage}
          </div>
        )}

        {notificationOpen && (
          <div className="dropdown">
            <div className="dropdown-item" style={{ fontWeight: 600 }}>
              Notifications
            </div>
            <button
              type="button"
              className="dropdown-item"
              onClick={async () => {
                try {
                  await request("/api/tasks/notifications/read-all/", { method: "PATCH" });
                  await refreshNotifications();
                } catch {
                  // Ignore update errors
                }
              }}
              style={{ textAlign: "left", width: "100%" }}
            >
              Mark all as read
            </button>
            {notifications.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dropdown-item ${item.is_read ? "" : "unread"}`}
                onClick={() => handleNotificationClick(item)}
                style={{ textAlign: "left", width: "100%" }}
              >
                <strong>{item.title}</strong>
                {item.message ? <div style={{ fontSize: "0.88rem", color: "#475569" }}>{item.message}</div> : null}
              </button>
            ))}
            {notifications.length === 0 && (
              <div className="dropdown-item">No new notifications</div>
            )}
          </div>
        )}

        {/* Avatar */}
        <div
          className="avatar"
          onClick={() => {
            setOpen(!open);
            setNotificationOpen(false);
          }}
        >
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