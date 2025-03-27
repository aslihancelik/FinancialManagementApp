import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountList from "./AccountList";
import { fetchAccounts } from "./api";

const Wallet = () => {
  // State to store user accounts
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); //error state
  const navigate = useNavigate(); // Navigate to different routes programmatically

  // Fetch accounts when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      // If no token is found, redirect to login
      if (!token) {
        setError("You are not logged in. Please log in to continue.");
        navigate("/login"); // Navigate to login page
        return;
      }

      try {
        const accounts = await fetchAccounts();
        setAccounts(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("There was an error fetching your accounts."); // Set error message
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Loading your accounts...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Show the error message if there's any
  }

  return (
    <div className="wallet-container">
      <h1>Wallet</h1>

     <button onClick={() => navigate("/add-card")}>Add New Card</button>
      <button onClick={() => navigate("/add-account")}>Link New Account</button>

      <AccountList accounts={accounts} /> {/* Use AccountList component */}
    </div>
  );
};
export default Wallet;