import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure to import Link from react-router-dom

const Dashboard = () => {
  // State to store user accounts
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate(); // Navigate to different routes programmatically

  // Fetch accounts when component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      // If no token is found, redirect to login
      if (!token) {
        alert("You are not logged in. Please log in to continue.");
        navigate("/login"); // Navigate to login page
        return;
      }

      try {
        // Make the API request to fetch the accounts
        const response = await fetch(`${API_URL}/accounts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });

        const data = await response.json();

        // If the request was successful, set accounts in state
        if (response.ok) {
          setAccounts(data);
        } else {
          alert(`Error fetching accounts: ${data.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("There was an error fetching your accounts.");
      }
    };

    fetchAccounts();
  }, [navigate]); // Re-run the effect if navigate changes (although it shouldn't change in this case)

  return (
    <div className="dashboard-container">
      <h1>Wallet</h1>

      {/* Navigation buttons */}
      <Link to="/add-card">
        <button>Add New Card</button>
      </Link>
      <Link to="/add-account">
        <button>Link New Account</button>
      </Link>

      {/* Display the user's financial accounts */}
      <div className="accounts-list">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div key={account.id} className="account-card">
              <h3>{account.name}</h3>
              <p>Type: {account.type}</p>
              <p>Balance: ${account.balance}</p> {/* Display balance */}
            </div>
          ))
        ) : (
          <p>No accounts linked yet.</p> // Message when no accounts are found
        )}
      </div>
    </div>
  );
};

export default Dashboard;
