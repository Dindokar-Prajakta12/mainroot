import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./GeneralSettings.css";

// Settings config (frontend-only)
const SETTINGS_CONFIG = {
  Admin: {
    title: "Admin Controls",
    options: [
      { key: "userRegistration", label: "Enable User Registration" },
      { key: "maintenanceMode", label: "Maintenance Mode" },
      { key: "roleManagement", label: "Allow Role Management" },
      { key: "systemAlerts", label: "System Alerts" },
      { key: "securityPolicies", label: "Security Policies" }
    ]
  },
  Manager: {
    title: "Manager Controls",
    options: [
      { key: "reportVisibility", label: "Report Visibility" },
      { key: "teamNotifications", label: "Team Notifications" },
      { key: "exportPermissions", label: "Export Permissions" },
      { key: "approvalFlows", label: "Approval Flows" }
    ]
  }
};

const GeneralSettings = () => {
  // Later from AuthContext
  const user = { role: "Admin" };

  // Block normal users
  if (user.role === "User") {
    return <Navigate to="/unauthorized" />;
  }

  // Frontend state (mock settings)
  const [settings, setSettings] = useState({
    userRegistration: true,
    maintenanceMode: false,
    roleManagement: true,
    systemAlerts: true,
    securityPolicies: false,
    reportVisibility: true,
    teamNotifications: true,
    exportPermissions: false,
    approvalFlows: false
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="settings-container">
      <h2>General Settings</h2>

      {/* Admin Section */}
      {user.role === "Admin" && (
        <div className="settings-card">
          <h3>{SETTINGS_CONFIG.Admin.title}</h3>

          {SETTINGS_CONFIG.Admin.options.map((item) => (
            <label key={item.key}>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => toggleSetting(item.key)}
              />
              {item.label}
            </label>
          ))}
        </div>
      )}

      {/* Manager Section */}
      {(user.role === "Admin" || user.role === "Manager") && (
        <div className="settings-card">
          <h3>{SETTINGS_CONFIG.Manager.title}</h3>

          {SETTINGS_CONFIG.Manager.options.map((item) => (
            <label key={item.key}>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => toggleSetting(item.key)}
              />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
