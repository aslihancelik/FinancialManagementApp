import React, { useState } from "react";

const LinkCard = () => {
  const API_URL = "http://localhost:3000/api"; // Ensure this URL is defined

  // State to store card details entered by user
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expDate: "",
    cvc: "",
  });

  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handle change in input fields and update state dynamically
  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value.trim() }); //trim whitespace to avoid validation issues with extra space
  };

  // Validate inputs
  const validateInputs = () => {
    // Validate card number (16 digits)
    if (!cardData.number.match(/^\d{16}$/)) {
      return "Please enter a valid 16-digit card number.";
    }
    // Validate expiration date (MM/YY format)
    if (!cardData.expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      return "Please enter a valid expiration date (MM/YY).";
    }
    // Validate CVC (3 or 4 digits)
    if (!cardData.cvc.match(/^\d{3,4}$/)) {
      return "Please enter a valid CVC (3 or 4 digits).";
    }
    return null;
  };

  // Handle form submission when confirm is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    } else {
      setErrorMessage(""); // Clear any previous error
    }

    // Retrieve token from LocalStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      window.location.href = "/login";
      return;
    }

    try {
      // Send a request to the backend to link the card
      const response = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token
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
        setCardData({ name: "", number: "", expDate: "", cvc: "" }); // Clear the input fields
      } else {
        console.error("Error linking card:", data);
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
        {/* Display error message if there is one */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Cardholder Name */}
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          onChange={handleChange}
          value={cardData.name}
          required
        />
        {/* Card Number */}
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={handleChange}
          value={cardData.number}
          required
        />
        {/* Expiration Date */}
        <input
          type="text"
          name="expDate"
          placeholder="Expiration Date (MM/YY)"
          onChange={handleChange}
          value={cardData.expDate}
          required
        />
        {/* CVC */}
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
