// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AddTransactionForm from "../components/AddTransactionForm";
// import axios from "axios";

// const AddTransactionPage = () => {
//   const navigate = useNavigate();

//   const handleFormSubmit = async (data) => {
//     try {
//       await axios.post("http://localhost:3000/api/transactions", data); // Save to database
//       navigate("/"); // Redirect to Transactions page
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//     }
//   };

//   return <AddTransactionForm onSubmit={handleFormSubmit} />;
// };

// export default AddTransactionPage;



import React from "react";
import { useNavigate } from "react-router-dom";
import AddTransactionForm from "../components/AddTransactionForm";
import { addTransaction } from "../api/transactionsApi"; // Import API function

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      await addTransaction(data); // Use centralized API function
      navigate("/"); // Redirect to Transactions page
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return <AddTransactionForm onSubmit={handleFormSubmit} />;
};

export default AddTransactionPage;
