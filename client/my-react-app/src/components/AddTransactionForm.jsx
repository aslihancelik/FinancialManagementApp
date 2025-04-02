import React, { useState } from "react";

const AddTransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ amount: "", category: "", description: "", date: "" });
  };

  return (
    <div className="transaction">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h1>New Transaction</h1>
        <label className="transaction-label">
          Amount:
          <input
            type="number"
            name="amount"
            className="transaction-input"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label className="transaction-label">
          Category:
          <input
            type="text"
            name="category"
            className="transaction-input"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label className="transaction-label">
          Description:
          <textarea
            name="description"
            className="transaction-textarea"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className="transaction-label">
          Date:
          <input
            type="date"
            name="date"
            className="transaction-input transaction-date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <button className="transaction-button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
