import axios from "axios";
import { jwtDecode } from "jwt-decode";


const API_URL = "http://localhost:3000/api/auth";

// ✅ Signup Function (Updated for firstName and lastName)
export const signup = async (userData) => {
  try {
    console.log("🔹 Sending signup request with:", userData);

    // Send firstName, lastName, email, and password to the backend
    const response = await axios.post(`${API_URL}/signup`, {
      firstName: userData.firstName, // Updated field for firstName
      lastName: userData.lastName, // Updated field for lastName
      email: userData.email,
      password: userData.password,
    });

    console.log("✅ Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// ✅ Login Function (No changes needed for login functionality, but ensure backend sends firstName and lastName)
export const login = async (credentials) => {
  try {
    console.log("🔹 Logging in with:", credentials);

    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    console.log("✅ Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ✅ Check if the token has expired
const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp < currentTime;
};

// ✅ Get User Data Function (Updated to handle firstName and lastName)
export const getUser = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("❌ No authentication token found. Logging out.");
      return null; // Return null instead of throwing an error
    }

    // Check if the token is expired
    if (isTokenExpired(token)) {
      console.warn("❌ Token expired. Logging out.");
      localStorage.removeItem("authToken");
      return null;
    }

    console.log("🔹 Fetching user with token:", token);

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Get user error:", error.response?.data || error.message);

    // If token is invalid, clear storage and force logout
    if (error.response?.status === 401) {
      console.warn("❌ Token is invalid. Logging out.");
      localStorage.removeItem("authToken");
      return null;
    }

    // Enhanced error message
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};

// Optional: Add token expiration check after successful login
export const checkTokenValidity = () => {
  const token = localStorage.getItem("authToken");

  if (token && isTokenExpired(token)) {
    console.warn("❌ Token expired. Logging out.");
    localStorage.removeItem("authToken");
    return false;
  }
  return true;
};
