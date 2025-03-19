import React, { useState } from "react";
import { PlaidLink } from "react-plaid-link";

const LinkAccount = ({ linkToken }) => {
  const [accountType, setAccountType] = useState("bank"); // Default to bank account

  const handleOnSuccess = (publicToken, metadata) => {
    const endpoint =
      accountType === "bank"
        ? "/api/accounts/bank"
        : "/api/accounts/credit-card";

    // Send the public token to the appropriate backend endpoint
    fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicToken, metadata }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`${accountType} account linked successfully:`, data);
      })
      .catch((error) =>
        console.error(`Error linking ${accountType} account:`, error)
      );
  };

  return (
    <div>
      <h2>Link an Account</h2>
      {/* Allow user to select account type */}
      <div>
        <label>
          <input
            type="radio"
            value="bank"
            checked={accountType === "bank"}
            onChange={() => setAccountType("bank")}
          />
          Bank Account
        </label>
        <label>
          <input
            type="radio"
            value="credit-card"
            checked={accountType === "credit-card"}
            onChange={() => setAccountType("credit-card")}
          />
          Credit Card
        </label>
      </div>

      {/* Plaid Link Component */}
      <PlaidLink
        token={linkToken} // Use the dynamically fetched link token
        onSuccess={handleOnSuccess}
        onExit={(error, metadata) => console.log("Exited Plaid Link", error)}
      >
        Link your {accountType === "bank" ? "Bank Account" : "Credit Card"}
      </PlaidLink>
    </div>
  );
};

export default LinkAccount;
