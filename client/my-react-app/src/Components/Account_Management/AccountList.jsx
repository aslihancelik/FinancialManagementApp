import React from "react";

// Function to mask account numbers, showing only the last 4 digits
const maskAccountNumber = (number) => {
  if (!number) return "****"; // If undefined, return masked placeholder

  const strNumber = String(number).replace(/\D/g, ""); // Ensure it's a clean number
  console.log(" Converted to String:", strNumber); // trying to debugging the issue

  if (strNumber.length < 4) return "****"; // Handle cases where the number is too short

  return `**** **** **** ${strNumber.slice(-4)}`; // Mask all except last 4 digits
};

const AccountList = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return <p>No accounts found.</p>;
  }

  return (
    <div className="accounts-list">
      {accounts.map((account) => {
        // Extract account number safely from either bankAccount or creditCard
        const accountNumber =
          account?.creditCard?.number ||
          account?.bankAccount?.accountNumber ||
          null;

        // Debugging: Log the full account object and specific properties
        console.log(" Account Object:", account); // Full account object
        console.log(
          "Extracted Account Number Before Masking:",
          accountNumber
        ); // Debugging accountNumber
        console.log("Bank Account Number:",account?.bankAccount?.accountNumber );
        console.log(" Credit Card Number:", account?.creditCard?.number);

        if (!accountNumber) {
          console.log(" No account number found for this account.");
        }

        return (
          <div key={account._id || account.id} className="account-item">
            <h3>{account.name || "Unnamed Account"}</h3>
            <p>Type: {account.type || "Unknown"}</p>
            <p>Number: {maskAccountNumber(accountNumber)}</p>
          </div>
        );
      })}
    </div>
  );
};


export default AccountList;
