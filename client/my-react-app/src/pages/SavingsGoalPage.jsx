import React, { useState } from 'react';
import SavingsGoalList from '../components/SavingsGoalList';
import SavingsGoalForm from '../components/SavingsGoalForm';

const initialGoals = [
  { id: 1, name: 'Vacation', targetAmount: 2000, currentAmount: 500 },
  { id: 2, name: 'Emergency Fund', targetAmount: 1000, currentAmount: 300 },
];

const SavingsGoalsPage = () => {
  const [savingsGoals, setSavingsGoals] = useState(initialGoals);
  const [errorMessage, setErrorMessage] = useState(''); // To store error messages

  const addSavingsGoal = (newGoal) => {
    // Check if targetAmount is greater than currentAmount
    if (newGoal.targetAmount < newGoal.currentAmount) {
      setErrorMessage('Target amount cannot be less than current amount.');
      return; // Prevent goal from being added
    }

    // Check if the goal name already exists
    const goalExists = savingsGoals.some(goal => goal.name === newGoal.name);
    if (goalExists) {
      setErrorMessage('A goal with this name already exists.');
      return;
    }

    // If validation passes, add the new goal with an id
    const newGoalWithId = {
      ...newGoal,
      id: savingsGoals.length + 1, // Simple incremental id
    };

    setSavingsGoals([...savingsGoals, newGoalWithId]);
    setErrorMessage(''); // Clear the error message
  };

  const removeSavingsGoal = (id) => {
    setSavingsGoals(savingsGoals.filter(goal => goal.id !== id));
  };

  const editSavingsGoal = (updatedGoal) => {
    const updatedGoals = savingsGoals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setSavingsGoals(updatedGoals);
  };

  return (
    <div>
      <h2>Savings Goals</h2>

      {/* Display error message if there is one */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <SavingsGoalList
        savingsGoals={savingsGoals}
        removeSavingsGoal={removeSavingsGoal}
        editSavingsGoal={editSavingsGoal}
      />

      <SavingsGoalForm addSavingsGoal={addSavingsGoal} />
    </div>
  );
};

export default SavingsGoalsPage;



