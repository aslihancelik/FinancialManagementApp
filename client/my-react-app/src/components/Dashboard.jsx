import React, { useState } from "react";
import PlaidLinkButton from "./PlaidLinkButton";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);   //bypass authentication
  const handleAccountLinked = (token) => {
    console.log("Account linked successfully with token:", token);
    alert("Account linked successfully!");
  };
  if(!isAuthenticated) {
    return <p>You need to log in first.</p>;
  }

  return (
    <div className="center-container">
      <h2>Welcome to Your Dashboard</h2>
      {/* Make sure this button is only rendered once per page */}
      <PlaidLinkButton  onAccountLinked={handleAccountLinked}/>
    </div>
  );
};

export default Dashboard;
