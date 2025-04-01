import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountList from "./AccountList";
import { fetchAccounts } from "./api";
import { Link } from "react-router-dom"; 

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
      navigate("/login"), 0;
      return;
    }

    const fetchData = async () => {
      try {
        const accounts = await fetchAccounts(token);
        setAccounts(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("There was an error fetching your accounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading && !error) {
    return <p>Loading your accounts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
        <AccountList accounts={accounts} />
      </div>
    </div>
  );
};

export default Wallet;
