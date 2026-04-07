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