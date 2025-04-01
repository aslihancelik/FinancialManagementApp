import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
  };
    // Create Axios instance for centralized API calls
    const apiClient = axios.create({
      baseURL: API_URL,
    });

    //  Add Axios interceptor to include the Authorization header
    apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Attach token automatically
        }
        return config; // Proceed with the request
      },
      (error) => {
        console.error(" Interceptor error:", error);
        return Promise.reject(error);
      }
    );

    const LinkCard = async (accountData) => {
      try {
        console.log(" Sending card data to the backend:", accountData);

        // Make the POST request to link the account
        // const response = await apiClient.post("/accounts", accountData);
        const response = await apiClient.post(
          "http://localhost:3000/api/accounts",
          accountData
        );

        console.log(" Card linked successfully:", response.data);
        return response.data; // Return the server response
      } catch (error) {
        console.error(
          " Error linking card:",
          error.response?.data || error.message
        );
        throw new Error(
          error.response?.data?.message || "Failed to link card"
        );
      }
    };

       const accountData =  {
          name: cardData.name,
          type: "credit card",
          balance: 0,
          creditCard: {
            number: cardData.number,
            expDate: cardData.expDate,
            cvc: cardData.cvc,
          },
        } 
    

    const handleLinkCard = async () => {
      try {
          const response = await LinkCard(accountData); // Call the linkCard function
      console.log(" Card linked successfully:", response);
      alert("Card linked successfully!");
    } catch (error) {
      console.error(" Error linking card:", error);
      alert(error.message || "Failed to link card.");
    }
  }
    
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

        <button type="submit" onClick={handleLinkCard}>
          Confirm
        </button>
      </form>
      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/dashboard/wallet">🏠 Dashboard</Link>
        <Link to="/bills">📋 Bills</Link>
        <Link to="/savings-goals">💰 Goals</Link>
      </div>
    </div>
  );
};

export default LinkCard;
