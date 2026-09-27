import request from "./api";

export const login = async (email, password) => {
  return request("/api/auth/login/", {
    method: "POST",
    body: {
      email: email,        // ✅ FINAL FIX (EMAIL USE)
      password: password,
    },
  });
};

export const register = async (name, email, password) => {
  return request("/api/auth/register/", {
    method: "POST",
    body: { name, email, password },
  });
};

export const getProfile = async (token) => {
  return request("/api/auth/profile/", {
    headers: { Authorization: `Token ${token}` },
  });
};

export const sendOtp = async (email) => {
  return request("/api/auth/send-otp/", {
    method: "POST",
    body: { email },
  });
};

export const verifyOtp = async (email, otp) => {
  return request("/api/auth/verify-otp/", {
    method: "POST",
    body: { email, otp },
  });
};

export const resetPassword = async (email, otp, newPassword) => {
  return request("/api/auth/reset-password/", {
    method: "POST",
    body: { email, otp, new_password: newPassword },
  });
};