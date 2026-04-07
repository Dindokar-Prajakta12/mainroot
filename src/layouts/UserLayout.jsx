import { useState } from "react";
import UserSidebar from "../modules/user/components/UserSidebar";
import UserNavbar from "../modules/user/components/UserNavbar";
import { Outlet } from "react-router-dom";
import "./styles/UserLayout.css"; // Import CSS for UserLayout

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="user-layout">
      <UserSidebar collapsed={collapsed} />

      <div className={`main-content ${collapsed ? "expanded" : ""}`}>
        <UserNavbar toggleSidebar={toggleSidebar} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;