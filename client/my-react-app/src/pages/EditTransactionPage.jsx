import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../api/transactionsApi";
import "../styles/EditTransactionPage.css";

const EditTransactionPage = () => {
  const { id } = useParams(); // Get transaction ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(true); // Add loading state to handle API call

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await fetchTransactionById(id);
        console.log("Fetched Transaction:", response.data); // Debugging
        const transaction = response.data; // Ensure correct data retrieval

        setFormData({
          amount: transaction?.amount || "", // Fallback to empty string
          category: transaction?.category || "", // Fallback to empty string
          date: transaction?.date ? transaction.date.split("T")[0] : "", // Format or fallback
          description: transaction?.description || "", // Optional field fallback
        });
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    getTransaction();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);


const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Convert amount to a number
  const updatedFormData = { ...formData, amount: Number(formData.amount) };
  console.log("📤 Sending update request:", id, updatedFormData);

  try {
    await updateTransaction(id, updatedFormData); // Send updated data to backend
    console.log("✅ Update successful!");
    navigate("/"); // Redirect to Transactions page
  } catch (error) {
    console.error("Error updating transaction:", error);
    // Optional: Display error message to the user
  }
};

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );
  if (confirmDelete) {
    try {
      await deleteTransaction(id);
      console.log("🗑 Transaction deleted!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }
};


  if (loading) {
    return <div>Loading...</div>; // Display a loading state while fetching
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Edit Transaction</h1>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date} // Pre-filled value
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Save Changes</button>
      <button type="button" className="delete-button" onClick={handleDelete}>
        Delete Transaction
      </button>
    </form>
  );
};

export default EditTransactionPage;