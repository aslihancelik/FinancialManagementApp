import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID generation

// BillForm component
const BillForm = ({ addBill, editBill, billToEdit }) => {
  const [name, setName] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [error, setError] = useState('');

  // Reset form if billToEdit changes
  useEffect(() => {
    if (billToEdit) {
      setName(billToEdit.name);
      setAmountDue(billToEdit.amountDue.toString()); // Make sure it's a string for input
      setFrequency(billToEdit.frequency);
    }
  }, [billToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (name.trim() === '') {
      setError('Bill name cannot be empty.');
      return;
    }

    if (amountDue.trim() === '' || isNaN(amountDue) || parseFloat(amountDue) <= 0) {
      setError('Amount Due should be a positive number.');
      return;
    }

    const bill = {
      id: billToEdit ? billToEdit.id : uuidv4(), // Use uuid for new bill ID
      name,
      amountDue: parseFloat(amountDue),
      frequency,
    };

    if (billToEdit) {
      editBill(bill); // Update existing bill
    } else {
      addBill(bill); // Add new bill
    }

    // Reset form after submission
    setName('');
    setAmountDue('');
    setFrequency('Monthly');
    setError('');
  };

  return (
    <div>
      <h3>{billToEdit ? 'Edit Bill' : 'Add Bill'}</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Error message with class */}
        
        <div>
          <label htmlFor="name">Bill Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="amountDue">Amount Due:</label>
          <input
            type="number"
            id="amountDue"
            value={amountDue}
            onChange={(e) => setAmountDue(e.target.value)}
            required
            min="0" // Ensure only positive amounts
          />
        </div>

        <div>
          <label htmlFor="frequency">Frequency:</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <button type="submit">{billToEdit ? 'Update Bill' : 'Add Bill'}</button>
      </form>
    </div>
  );
};

export default BillForm;



