import React from "react";
// AccountCard component takes an `account` prop to display the details of a specific account 
const AccountCard = ({ account }) => {
  return (
    <div className="account-card">
      {/* Display the name of the account (e.g., cardholder's name or account name) */}
      <h3>{account.name}</h3>
      {/* Display the account type (e.g., Credit Card or Bank Account) */}
      <p>Type: {account.type}</p>
      {/* Check if the account type is "credit card" */}
      {account.type.toLowerCase() === "credit card" ? (
        <>
          {/* If it's a credit card, display the last 4 digits of the card number */}
          <p>
            Card Number: **** **** **** {account.creditCard?.number.slice(-4)}
          </p>
          {/* Display the expiration date of the credit card */}
          <p>Exp: {account.creditCard?.expDate || "MM/YY"}</p>
        </>
      ) : account.bankAccount ? (
        <>
          {/* For bank accounts, display the last 4 digits of routing number and account number */}
          <p>Routing: **** {account.bankAccount.routingNumber.slice(-4)}</p>
          <p>Account: **** {account.bankAccount.accountNumber.slice(-4)}</p>
        </>
      ) : (
        // If neither a credit card nor a bank account is found, display this message
        <p>No additional account details available.</p>
      )}
    </div>
  );
};

export default AccountCard;