import React, { useState } from "react";
const AccountForm = ({ onsubmit, existingAccount }) => {
  //initialize form state with existing account data always if available
  const [name, setName] = useState(existingAccount?.name || "");
  const [type, setType] = useState(existingAccount?.type || "Bank");
  const [balance, setBalance] = useState(existingAccount?.balance || "");

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit({ name, type, balance: parseFloat(balance) }); //try to convert balance to a number
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Bank">Bank</option>
        <option value=" Credit Card">Credit Card</option>
      </select>
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
      />
      <button type="submit">
        {existingAccount ? "Update" : "Add"} Account{" "}
      </button>
    </form>
  );
};

export default AccountForm;
