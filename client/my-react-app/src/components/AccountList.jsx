import React from "react";
import AccountCard from "./AccountCard"; // The card component for individual accounts

// AccountList component takes an `accounts` prop which is an array of account objects
const AccountList = ({ accounts }) => {
  // Check if the accounts array is empty or undefined
  if (!accounts || accounts.length === 0) {
    // If there are no accounts, display a message indicating no accounts were found
    return <p>No accounts found.</p>;
  }

  return (
    <div className="accounts-list">
      {/* Iterate over each account in the accounts array */}
      {accounts.map((account) => (
        // For each account, render an AccountCard component and pass the account data as a prop
        // Use either the `account._id` or `account.id` as a unique key for each AccountCard
        <AccountCard key={account._id || account.id} account={account} />
      ))}
    </div>
  );
};

export default AccountList;
