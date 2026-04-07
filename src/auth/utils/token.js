// token.js

// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem("authToken"); // Retrieve JWT token
};

// Function to store the token in localStorage
export const setToken = (token) => {
  localStorage.setItem("authToken", token); // Store JWT token
};

// Function to remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem("authToken"); // Remove JWT token
};

// Function to check if the token exists
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Return true if token exists, false otherwise
};

// Function to decode the token (JWT decoding)
export const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split('.')[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert to base64 format
  const decodedPayload = JSON.parse(window.atob(base64)); // Decode the payload
  return decodedPayload; // Return decoded payload (usually contains user info)
};

// Function to check if the token is expired (JWT expiration check)
export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = decodeToken(token);
  const currentTime = Date.now() / 1000; // Get current time in seconds
  return decoded.exp < currentTime; // Check if token has expired
};