import React, { useState } from "react";

const LinkCard = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState(""); // Error state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!cardName || !cardNumber || !cvv || !expirationDate) {
      setError("All fields are required.");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      // Strip spaces for validation
      setError("Card number must be 16 digits.");
      return;
    }

    if (cvv.length !== 3) {
      setError("CVV must be 3 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      setError("Expiration date must be in MM/YY format.");
      return;
    }

    // Clear any existing error if validation is successful
    setError("");

    // Simulate API call
    console.log("Card Linked:", { cardName, cardNumber, cvv, expirationDate });
    setCardName("");
    setCardNumber("");
    setCvv("");
    setExpirationDate("");
  };

  // Format the card number as user types (e.g., 4111 1111 1111 1111)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, "$1 ")); // Add space every 4 digits
  };

  return (
    <div className="link-card-container">
      <h2>Link a New Card</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="card-name">Name on Card:</label>
          <input
            type="text"
            id="card-name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text" // Changed to text to allow card number format
            id="card-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
            maxLength="19" // Max length after formatting
          />
        </div>

        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text" // Changed to text to allow CVV validation
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            maxLength="3"
          />
        </div>

        <div>
          <label htmlFor="expiration-date">Expiration Date (MM/YY):</label>
          <input
            type="text" // Changed to text to allow expiration date format
            id="expiration-date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
            maxLength="5" // Max length for MM/YY format
            placeholder="MM/YY"
          />
        </div>

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default LinkCard;
