import React, { useState } from "react";

const LinkCard = () => {
  //state to store card details entered by user
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expDate: "",
    cvc: "",
  });

  // Handle change in input fields aand updates the state dynamically
  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  // Handle form submission when confirm is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks, must be 16 digits
    if (!cardData.number.match(/^\d{16}$/)) {
      return alert("Please enter a valid 16-digit card number.");
    }
    // Validate exp date
    if (!cardData.expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      return alert("Please enter a valid expiration date (MM/YY).");
    }
    //validate cvc
    if (!cardData.cvc.match(/^\d{3,4}$/)) {
      return alert("Please enter a valid CVC (3 or 4 digits).");
    }

    //retrieve token from LocalStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to continue");
      //redirect to the Login page
      window.location.href = "/login";
      return;
    }
    try {
      //send a  request to the backend to link the card
      const response = await fetch(`${API_URL}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // includes the jwt token
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
        setCardData({name: "", number: "", expDate: "", cvc: ""});  //clear the input fields
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
        {/*cardholder name input */}
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          onChange={handleChange}
          value={cardData.name}
          required
        />
        {/*card number input */}
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={handleChange}
          value={cardData.number}
          required
        />
        {/*exp date input */}
        <input
          type="text"
          name="expDate"
          placeholder="Expiration Date (MM/YY)"
          onChange={handleChange}
          value={cardData.expDate}
          required
        />
        {/*cvc input */}
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
