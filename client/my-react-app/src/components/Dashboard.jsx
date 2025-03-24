import React, { useState, useEffect } from "react";
import { fetchAccounts } from "./api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //state to store user accounts
  const [linkedAccount, setLinkedAccount] = useState([]);

  const [accounts, setAccounts] = useState([]);

  //fetch accounts when component mounts
  useEffect(() => {
    fetchAccounts().then(setAccounts);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Wallet</h1>

      {/* navigation button*/}
      <Link to="/add-card">
        <button>Add New Card</button>
      </Link>
      <Link to="/add-account">
        <button>Link New Account</button>
      </Link>

      {/*display the user's financial accounts */}
      <div className="accounts-list">
        {accounts.map((account) => (
          <div key={account.id} className="account-card">
            <h3>{account.name}</h3>
            <p>Type: {account.type}</p>
            <p>Balance: ${account.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
