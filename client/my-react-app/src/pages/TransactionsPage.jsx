import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import TransactionList from "../components/TransactionList";
import { fetchTransactions } from "../api/transactionsApi"; // Import the function
import "../styles/TransactionsPage.css"; // Import the updated CSS

import { sortTransactionsByDate } from "../utils/sortTransactions";
import { FaEdit } from "react-icons/fa";

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

  // Sort transactions after fetching them
  const sortedTransactions = sortTransactionsByDate(transactions);

  return (
    <div>
      <h1>Transactions</h1>
      <button
        className="add-transaction"
        onClick={() => navigate("/add-transaction")}
      >
        Add Transaction
      </button>

      <div className="table-container">
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
            {/* {transactions.map((transaction) => ( */}
            {sortedTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>
                  {new Date(transaction.date).toISOString().split("T")[0]}
                </td>
                <td>{transaction.category}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/edit-transaction/${transaction._id}`)
                    }
                  >
                    {/* Edit */}
                    <FaEdit /> {/* This replaces text with the edit icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
