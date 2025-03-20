import React, { useState } from 'react';
import SavingsGoalList from '../components/SavingsGoalList';
import SavingsGoalForm from '../components/SavingsGoalForm';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import PropTypes from 'prop-types'; // Import PropTypes for validation

// Example initial data (could be moved to a separate data.js file)
const initialGoals = [
  { id: 1, name: 'Vacation', targetAmount: 2000, currentAmount: 500 },
  { id: 2, name: 'Emergency Fund', targetAmount: 1000, currentAmount: 300 },
];

const SavingsGoalsPage = () => {
  const [savingsGoals, setSavingsGoals] = useState(initialGoals);

  const addSavingsGoal = (newGoal) => {
    // Prevent adding goals where targetAmount < currentAmount
    if (newGoal.targetAmount < newGoal.currentAmount) {
      alert("Target amount cannot be less than current amount.");
      return;
    }

    setSavingsGoals((prevGoals) => {
      const goalExists = prevGoals.some((goal) => goal.name === newGoal.name);
      if (goalExists) {
        alert("A goal with this name already exists");
        return prevGoals;
      }
      // Add unique id to the new goal
      const goalWithId = { ...newGoal, id: uuidv4() };
      return [...prevGoals, goalWithId];
    });
  };

  const removeSavingsGoal = (id) => {
    setSavingsGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const editSavingsGoal = (updatedGoal) => {
    setSavingsGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  return (
    <div>
      <h2>Savings Goals</h2>
      <SavingsGoalList savingsGoals={savingsGoals} removeSavingsGoal={removeSavingsGoal} editSavingsGoal={editSavingsGoal} />
      <SavingsGoalForm addSavingsGoal={addSavingsGoal} />
    </div>
  );
};

SavingsGoalsPage.propTypes = {
  savingsGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, 
      name: PropTypes.string.isRequired,
      targetAmount: PropTypes.number.isRequired,
      currentAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  addSavingsGoal: PropTypes.func.isRequired,
  removeSavingsGoal: PropTypes.func.isRequired,
  editSavingsGoal: PropTypes.func.isRequired,
};

export default SavingsGoalsPage;


