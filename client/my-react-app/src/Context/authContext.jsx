import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../api/auth"; // Ensure getUser function is correctly defined

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state to handle async behavior
  const [error, setError] = useState(null); // Track if there's an error fetching the user

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No auth token found");
        setLoading(false); // Set loading to false when there's no token
        return;
      }

      try {
        // Make sure the token is valid and the API fetches the user data correctly
        console.log("Fetching user with token:", token);
        const userData = await getUser();
        setUser(userData);
        setLoading(false); // Set loading to false once the user is fetched
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user. Please log in again.");
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUser();
  }, []);

  // Loading and error states can be used in the app to show loading indicators or error messages
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
