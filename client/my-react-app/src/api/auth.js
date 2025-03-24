import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// Create Axios instance for centralized API calls
const apiClient = axios.create({
  baseURL: API_URL,
});

// ✅ Add Axios interceptor to include the Authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token automatically
    
  }
  return config; // Proceed with the request
}, (error) => {
  console.error("❌ Interceptor error:", error);
  return Promise.reject(error);
});

// ✅ Signup Function
export const signup = async (userData) => {
  try {
    console.log("🔹 Sending signup request with:", userData);
  
       const response = await apiClient.post("/signup", {
         firstName: userData.firstName, // Split name into firstName
         lastName: userData.lastName, // and lastName
         email: userData.email,
         password: userData.password,
       });

     if (response.data.token) {
       localStorage.setItem("authToken", response.data.token); // Store token after signup
     }


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

    const response = await apiClient.post("/login", credentials); 

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


export const getUser = async () => {
  try {
    console.log("🔹 Fetching user data");

    // Axios instance automatically includes the token
    const response = await apiClient.get("/me", { withCredentials: true });

    return response.data;
  } catch (error) {
    console.error("❌ Get user error:", {
      status: error.response?.status,
      message: error.response?.data || error.message,
    });

    if (error.response?.status === 401) {
      console.warn("❌ Token is invalid. Logging out.");
      localStorage.removeItem("authToken");
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login page
      return null;
    }

    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};




// export const linkAccount = async (accountData) => {
//   try {
//     console.log("🔹 Sending account data to the backend:", accountData);

//     // Make the POST request to link the account
//     // const response = await apiClient.post("/accounts", accountData);
//     const response = await apiClient.post("http://localhost:3000/api/accounts", accountData);

//     console.log("✅ Account linked successfully:", response.data);
//     return response.data; // Return the server response
//   } catch (error) {
//     console.error(
//       "❌ Error linking account:",
//       error.response?.data || error.message
//     );
//     throw new Error(error.response?.data?.message || "Failed to link account");
//   }
// };