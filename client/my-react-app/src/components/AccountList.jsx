import { useState } from "react";
import AccountForm from "./AccountForm";

const AccountList = ({ accounts, setAccounts }) => {
  const [editingAccount, setEditingAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle account deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete account");

      // Remove deleted account from state
      setAccounts((prevAccounts) =>
        prevAccounts.filter((acc) => acc._id !== id)
      );
    } catch (error) {
      setError("Failed to delete account. Please try again.");
      console.error("Error deleting account:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle saving (adding/editing) an account
  const handleSave = async (account) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const method = editingAccount ? "PUT" : "POST";
      const url = editingAccount
        ? `http://localhost:3000/api/accounts/${editingAccount._id}`
        : "http://localhost:3000/api/accounts";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(account),
      });

      if (!response.ok) throw new Error("Failed to save account");

      const newAccount = await response.json();

      if (editingAccount) {
        // Update existing account in state
        setAccounts((prevAccounts) =>
          prevAccounts.map((acc) =>
            acc._id === newAccount._id ? newAccount : acc
          )
        );
      } else {
        // Add new account to state
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      }

      setEditingAccount(null); // Reset editing state
    } catch (error) {
      setError("Failed to save account. Please try again.");
      console.error("Error saving account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Display error message if any */}
      {error && <div className="error">{error}</div>}

      {/* Account form for adding or updating an account */}
      <AccountForm
        onSubmit={handleSave}
        existingAccount={editingAccount}
        isLoading={loading} // Pass loading state to form
      />

      {/* Show loading indicator while loading */}
      {loading && <div>Loading...</div>}

      <ul>
        {accounts.map((acc) => (
          <li key={acc._id}>
            {acc.name} ({acc.type}) - ${Number(acc.balance || 0).toFixed(2)}
            <button onClick={() => setEditingAccount(acc)}>Edit</button>
            <button onClick={() => handleDelete(acc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
