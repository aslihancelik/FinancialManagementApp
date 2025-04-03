import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountList from "./AccountList";
import { fetchAccounts } from "./api";

const Wallet = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token); // Debugging statement

    if (!token) {
      console.error("No token found, redirecting to login...");
      navigate("/login"); // Navigate immediately if no token is found
      return;
    }

    const fetchData = async () => {
      try {
        const accounts = await fetchAccounts(token);
        setAccounts(accounts); // Set the accounts data into state
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("There was an error fetching your accounts.");
      } finally {
        setLoading(false); // Stop loading state after fetching is complete
      }
    };

    fetchData(); // Call the function to fetch the data
  }, [navigate]); // Dependency array ensures effect runs once on mount

  if (loading && !error) {
    return <p>Loading your accounts...</p>; // Loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any error occurs
  }

  return (
    <div className="wallet-container">
      <h1> 💵 Wallet</h1>
      <button onClick={() => navigate("/wallet/LinkCard")}>
        💳 Add New Card
      </button>
      <button onClick={() => navigate("/wallet/LinkedAccounts")}>
        🏦 Link New Account
      </button>
      {/* Display the linked accounts */}
      <div className="linked-accounts-section">
        <h2>🔗 Linked Accounts</h2>
        <AccountList accounts={accounts} /> {/* Pass accounts to AccountList */}
      </div>
    </div>
  );
};

export default Wallet;
