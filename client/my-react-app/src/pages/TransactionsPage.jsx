import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import { fetchTransactions } from "../api/transactionsApi"; // Import the function
import "../styles/TransactionsPage.css"; // Import the updated CSS


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions(); // Use API function
        console.log(response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getTransactions();
  }, []);


  return (
    <div>
      <button
        className="add-transaction"
        onClick={() => navigate("/add-transaction")}
      >
        Add Transaction
      </button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;