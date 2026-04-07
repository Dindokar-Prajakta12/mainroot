import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ===== Layouts ===== */
import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import UserLayout from "./layouts/UserLayout";

/* ===== Pages ===== */
import Login from "./pages/auth/pages/LoginPage";
import Unauthorized from "./pages/common/Unauthorized";

/* ===== Admin Pages ===== */
import Dashboard from "./modules/admin/pages/dashboard/Dashboard";
import Overview from "./modules/admin/pages/dashboard/Overview";
import Analytics from "./modules/admin/pages/dashboard/Analytics";
import Users from "./modules/admin/pages/users/Users";
import AddUser from "./modules/admin/pages/users/AddUser";
import AllUsers from "./modules/admin/pages/users/AllUsers";
import RolePermissions from "./modules/admin/pages/role-permissions/RolePermissions";
import SalesReport from "./modules/admin/pages/reports/SalesReport";
import UserActivity from "./modules/admin/pages/reports/UserActivity";
import SystemUsage from "./modules/admin/pages/system-usage/SystemUsage";
import GeneralSettings from "./modules/admin/pages/settings/GeneralSettings";
import SecuritySettings from "./modules/admin/pages/settings/SecuritySettings";
import Profile from "./pages/common/Profile";
import ChangePassword from "./pages/common/ChangePassword";
import MyProfile from "./pages/common/MyProfile";
import Help from "./pages/common/Help";

/* ===== Manager Pages ===== */
import ManagerDashboard from "./modules/manager/pages/dashboard/ManagerDashboard";
import Team from "./modules/manager/pages/teams/Team";
import Approvals from "./modules/manager/pages/approvals/Approvals";
import ManagerReports from "./modules/manager/pages/reports/Reports";
import ManagerProfile from "./pages/common/Profile";
import ManagerSettings from "./modules/manager/pages/settings/ManagerSettings";

/* ===== User Pages ===== */
import UserDashboard from "./modules/user/pages/dashboard/UserDashboard";
import MyTasks from "./modules/user/pages/tasks/MyTasks";
import MyRequests from "./modules/user/pages/requests/MyRequests";
import MyReports from "./modules/user/pages/reports/MyReports";
import UserProfile from "./modules/user/pages/profile/UserProfile";
import UserSettings from "./modules/user/pages/settings/UserSettings";
import UserHelp from "./modules/user/pages/help/UserHelp";

const router = () => {
  const role = localStorage.getItem("role");

  const getDefaultRoute = () => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "manager") return "/manager/dashboard";
    if (role === "user") return "/user/dashboard";
    return "/login";
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/overview" element={<Overview />} />
          <Route path="dashboard/analytics" element={<Analytics />} />
          <Route path="users" element={<Users />}>
            <Route path="all" element={<AllUsers />} />
            <Route path="add" element={<AddUser />} />
          </Route>
          <Route path="roles-permissions" element={<RolePermissions />} />
          <Route path="reports/sales" element={<SalesReport />} />
          <Route path="reports/activity" element={<UserActivity />} />
          <Route path="system-usage" element={<SystemUsage />} />
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="settings/security" element={<SecuritySettings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* ================= MANAGER ROUTES ================= */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="profile" element={<ManagerProfile />} />
          <Route path="settings" element={<ManagerSettings />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="help" element={<UserHelp />} />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  );
};

export default router;