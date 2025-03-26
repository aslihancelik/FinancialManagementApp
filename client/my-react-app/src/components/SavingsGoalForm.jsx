import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs

const SavingsGoalForm = ({ addSavingsGoal, editSavingsGoal, goalToEdit }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [error, setError] = useState('');

  // If we are editing a goal, populate the form with its data
  useEffect(() => {
    if (goalToEdit) {
      setName(goalToEdit.name);
      setTargetAmount(goalToEdit.targetAmount.toString());
      setCurrentAmount(goalToEdit.currentAmount.toString());
    }
  }, [goalToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (name.trim() === '' || targetAmount.trim() === '' || currentAmount.trim() === '') {
      setError('Please provide valid inputs for all fields.');
      return;
    }

    if (isNaN(targetAmount) || parseFloat(targetAmount) <= 0) {
      setError('Please enter a valid target amount.');
      return;
    }

    if (isNaN(currentAmount) || parseFloat(currentAmount) < 0) {
      setError('Please enter a valid current amount.');
      return;
    }

    const newGoal = {
      id: goalToEdit ? goalToEdit.id : uuidv4(), // Use existing goal ID if editing, otherwise generate a new ID
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
    };

    if (goalToEdit) {
      editSavingsGoal(newGoal); // Edit the goal if we're updating it
    } else {
      addSavingsGoal(newGoal); // Add a new goal if we are creating one
    }

    // Clear form after submitting
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setError('');
  };

  return (
    <div>
      <h3>{goalToEdit ? 'Edit Savings Goal' : 'Add New Savings Goal'}</h3>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <div>
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="currentAmount">Current Amount:</label>
          <input
            type="number"
            id="currentAmount"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            required
            min="0"
          />
        </div>

        <button type="submit">{goalToEdit ? 'Update Goal' : 'Add Goal'}</button>
      </form>
    </div>
  );
};

export default SavingsGoalForm;
