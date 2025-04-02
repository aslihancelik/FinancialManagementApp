import React from "react";
import { useNavigate } from "react-router-dom";
import AddTransactionForm from "../components/AddTransactionForm";
import { addTransaction } from "../api/transactionsApi"; // Import API function
import "../styles/AddTransactionPage.css"; // Import the CSS file

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      await addTransaction(data); // Use centralized API function
      navigate("/transactions"); // Redirect to Transactions page
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return <AddTransactionForm onSubmit={handleFormSubmit} />;

};

export default AddTransactionPage;


