import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// ✅ Signup Function
export const signup = async (userData) => {
  try {
    console.log("🔹 Sending signup request with:", userData);

    const response = await axios.post(`${API_URL}/signup`, {
      name: userData.name, // ✅ Ensure correct field name
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

// ✅ Login Function
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

// ✅ Get User Data Function
export const getUser = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("❌ No authentication token found. Logging out.");
      return null; // ✅ Return null instead of throwing an error
    }

    console.log("🔹 Fetching user with token:", token);

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Get user error:", error.response?.data || error.message);

    // ✅ If token is invalid, clear storage and force logout
    if (error.response?.status === 401) {
      console.warn("❌ Token is invalid. Logging out.");
      localStorage.removeItem("authToken");
      return null;
    }

    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};
