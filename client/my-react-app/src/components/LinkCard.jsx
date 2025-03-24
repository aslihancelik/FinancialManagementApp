import React, { useState } from "react";

const LinkCard = () => {
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expDate: "",
    cvc: "",
  });

  // Handle change in input fields
  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!cardData.number.match(/^\d{16}$/)) {
      return alert("Please enter a valid 16-digit card number.");
    }

    if (!cardData.expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      return alert("Please enter a valid expiration date (MM/YY).");
    }

    if (!cardData.cvc.match(/^\d{3,4}$/)) {
      return alert("Please enter a valid CVC (3 or 4 digits).");
    }

    try {
      const response = await fetch("http://localhost:3000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is present
        },
        body: JSON.stringify({
          name: cardData.name,
          type: "credit card",
          balance: 0,
          creditCard: {
            number: cardData.number,
            expDate: cardData.expDate,
            cvc: cardData.cvc,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Card Linked Successfully!");
      } else {
        alert(`Error: ${data.message || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error linking card:", error);
      alert("There was an error connecting to the server.");
    }
  };

  return (
    <div className="container">
      <h1>Link a New Card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          onChange={handleChange}
          value={cardData.name}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={handleChange}
          value={cardData.number}
          required
        />
        <input
          type="text"
          name="expDate"
          placeholder="Expiration Date (MM/YY)"
          onChange={handleChange}
          value={cardData.expDate}
          required
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          onChange={handleChange}
          value={cardData.cvc}
          required
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default LinkCard;
