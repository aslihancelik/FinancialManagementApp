import React, { useState, useEffect } from "react";
import { fetchAccounts} from "./api"; 

const LinkedAccounts = () => {
  //state to store linked credit card accounts
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  // Fetch linked accounts when component mounts
  useEffect(() => {
    const getAccounts = async () => {
      try {
        //retrieve authentication token from localStorage
        const token = localStorage.getItem("token"); 

        // Check if token exists
        if (!token) {
          alert("You must be logged in to view linked accounts.");
          window.location.href = "/login";
          return;
        }

        //make an api request to fetch user accounts
        const response = await fetch(`${API_URL}/accounts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        const accounts = await response.json();  //parse response JSON
        //if request was successful, filter for credit card accounts
        if (response.ok) {
          const creditCards = accounts.filter(
            (acc) => acc.type.toLowerCase() === "credit card"
          );
          setLinkedAccounts(creditCards); // Set filtered accounts in state
        } else {
          alert(
            "Error fetching accounts: " + (data.message || "Unknown error")
          );
        }
      } catch (error) {
        //handle network error
        console.error("Error fetching accounts:", error);
        alert("An error occurred while fetching linked accounts.");
      }
    };

    getAccounts(); // Call the function to fetch accounts
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container">
      <h1>Linked Accounts</h1>
      {/*display the list of linked accounts */}
      <div className="accounts-list">
        {linkedAccounts.length > 0 ? (
          linkedAccounts.map((account) => (
            <div key={account._id} className="account-card">
              <h3>{account.name}</h3> {/* Corrected from Account.name */}
              <p>
                Routing: ****
                {account.bankAccount?.routingNumber.slice(-4) || "XXXX"}
              </p>
              <p>
                Account: ****
                {account.bankAccount?.accountNumber.slice(-4) || "XXXX"}
              </p>
            </div>
          ))
        ) : (
          <p>No linked accounts found.</p> //*display this message if no account found 
        )}
      </div>
    </div>
  );
};

export default LinkedAccounts;
