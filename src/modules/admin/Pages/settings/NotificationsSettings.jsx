import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./SecuritySettings.css";

const NotificationsSettings = () => {
    const user = { role: "Admin" };

    const [notifications, setNotifications] = useState([
        { id: 1, title: "New user request pending approval", read: false },
        { id: 2, title: "System maintenance scheduled", read: true },
        { id: 3, title: "Password policy updated", read: false },
    ]);

    if (!['Admin', 'Manager', 'User'].includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, read: true } : item
            )
        );
    };

    return (
        <div className="settings-container">
            <h2>Notification Settings</h2>

            <div className="settings-card">
                <h3>Notifications</h3>
                <p>Manage your notification alerts and mark them as read.</p>

                {notifications.map((item) => (
                    <div
                        key={item.id}
                        className={`notification-item ${item.read ? "read" : "unread"}`}
                    >
                        <div>
                            <strong>{item.title}</strong>
                        </div>
                        {!item.read && (
                            <button
                                className="save-btn"
                                type="button"
                                onClick={() => markAsRead(item.id)}
                            >
                                Mark as read
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsSettings;
