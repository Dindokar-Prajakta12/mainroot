const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("authToken") || localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw data;
  }

  return data;
};

export default request;