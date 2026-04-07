// roleRedirect.js

export const roleRedirect = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard"; // Redirect to Admin dashboard
    case "manager":
      return "/manager/dashboard"; // Redirect to Manager dashboard
    case "user":
      return "/user/dashboard"; // Redirect to User dashboard
    default:
      return "/login"; // Default route if no role found
  }
};