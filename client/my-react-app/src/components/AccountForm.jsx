import React, { useState, useEffect } from "react";

const AccountForm = ({ onSubmit, existingAccount }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("bank account");
  const [balance, setBalance] = useState(0);
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Load existing account data into form if editing an account
  useEffect(() => {
    if (existingAccount) {
      setName(existingAccount.name);
      setType(existingAccount.type);
      setBalance(existingAccount.balance);
      setRoutingNumber(existingAccount.routingNumber || "");
      setAccountNumber(existingAccount.accountNumber || "");
    }
  }, [existingAccount]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const accountData = { name, type, balance, routingNumber, accountNumber };
    onSubmit(accountData); // Pass data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <h2>{existingAccount ? "Edit Account" : "Link Account"}</h2>

      {/* Account type dropdown */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="bank account">Bank Account</option>
        <option value="credit card">Credit Card</option>
      </select>

      {/* Input for account name */}
      <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Input for balance */}
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
      />

      {/* Fields for bank account */}
      {type === "bank account" && (
        <>
          <input
            type="number"
            placeholder="Routing Number"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </>
      )}

      {/* Fields for credit card */}
      {type === "credit card" && (
        <>
          <input
            type="number"
            placeholder="Card Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
          <input type="number" placeholder="CVC" required />
        </>
      )}

      {/* Submit button */}
      <button type="submit">Confirm</button>
    </form>
  );
};

export default AccountForm;
