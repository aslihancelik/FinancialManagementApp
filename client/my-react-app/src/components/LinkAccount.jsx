import React, { useState } from "react";

const LinkAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState(""); // Added error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (
      !firstName ||
      !lastName ||
      !routingNumber ||
      !accountNumber ||
      !accountType
    ) {
      setError("All fields are required.");
      return;
    }

    if (!/^\d{9}$/.test(routingNumber)) {
      // Validate routing number (9 digits)
      setError("Routing number must be 9 digits.");
      return;
    }

    setError(""); // Clear error if validation is successful
    setLoading(true);

    // Perform form submission logic, like API calls
    try {
      console.log("Account Linked", {
        firstName,
        lastName,
        routingNumber,
        accountNumber,
        accountType,
      });
      // Simulate API call delay
      setTimeout(() => {
        setLoading(false);
        // Reset the form after submission
        setFirstName("");
        setLastName("");
        setRoutingNumber("");
        setAccountNumber("");
        setAccountType("");
      }, 2000);
    } catch (error) {
      setError("There was an issue linking the account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="link-account-container">
      <h2>Link a new account</h2>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="account-type">Select Account Type:</label>
          <select
            id="account-type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label htmlFor="first-name">First name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="last-name">Last name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="routing-number">Routing Number:</label>
          <input
            type="text"
            id="routing-number"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="account-number">Account Number:</label>
          <input
            type="text"
            id="account-number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Linking..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default LinkAccount;
