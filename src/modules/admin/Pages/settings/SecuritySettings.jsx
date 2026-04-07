import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./SecuritySettings.css";

const SecuritySettings = () => {
  // Later from AuthContext
  const user = {
    role: "Admin" // Admin | Manager | User
  };

  // Block unauthorized users
  if (!["Admin", "Manager", "User"].includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  const [security, setSecurity] = useState({
    strongPassword: true,
    twoFactorAuth: false,
    sessionTimeout: true,
    loginAttempts: true,
    forcePasswordReset: false
  });

  const toggle = (key) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="settings-container">
      <h2>Security Settings</h2>

      {/* ADMIN SECURITY */}
      {user.role === "Admin" && (
        <div className="settings-card">
          <h3>Admin Security Controls</h3>

          <label>
            <input
              type="checkbox"
              checked={security.strongPassword}
              onChange={() => toggle("strongPassword")}
            />
            Enforce Strong Password Policy
          </label>

          <label>
            <input
              type="checkbox"
              checked={security.loginAttempts}
              onChange={() => toggle("loginAttempts")}
            />
            Limit Login Attempts
          </label>

          <label>
            <input
              type="checkbox"
              checked={security.sessionTimeout}
              onChange={() => toggle("sessionTimeout")}
            />
            Session Timeout
          </label>
        </div>
      )}

      {/* MANAGER SECURITY */}
      {(user.role === "Admin" || user.role === "Manager") && (
        <div className="settings-card">
          <h3>Manager Security Controls</h3>

          <label>
            <input
              type="checkbox"
              checked={security.forcePasswordReset}
              onChange={() => toggle("forcePasswordReset")}
            />
            Force Team Password Reset
          </label>

          <label>
            <input type="checkbox" checked disabled />
            View Security Logs
          </label>
        </div>
      )}

      {/* USER SECURITY */}
      {user.role === "User" && (
        <div className="settings-card">
          <h3>Account Security</h3>

          <label>
            <input
              type="checkbox"
              checked={security.twoFactorAuth}
              onChange={() => toggle("twoFactorAuth")}
            />
            Enable Two-Factor Authentication
          </label>

          <button className="danger-btn">
            Change Password
          </button>

          <button className="danger-outline-btn">
            Logout from all devices
          </button>
        </div>
      )}

      <button className="save-btn">
        Save Security Settings
      </button>
    </div>
  );
};

export default SecuritySettings;
