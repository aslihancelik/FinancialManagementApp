import React, { useState } from 'react';
import SavingsGoalList from '../components/SavingsGoalList';
import SavingsGoalForm from '../components/SavingsGoalForm';
import { v4 as uuidv4 } from 'uuid';

const initialGoals = [
  { id: 1, name: 'Vacation', targetAmount: 2000, currentAmount: 500 },
  { id: 2, name: 'Emergency Fund', targetAmount: 1000, currentAmount: 300 },
];

const SavingsGoalsPage = () => {
  const [savingsGoals, setSavingsGoals] = useState(initialGoals);

  const addSavingsGoal = (newGoal) => {
    if (newGoal.targetAmount < newGoal.currentAmount) {
      alert("Target amount cannot be less than current amount.");
      return;
    }

    if (newGoal.targetAmount < 0 || newGoal.currentAmount < 0) {
      alert("Amounts cannot be negative.");
      return;
    }

    setSavingsGoals((prevGoals) => {
      const goalExists = prevGoals.some((goal) => goal.name === newGoal.name);
      if (goalExists) {
        alert("A goal with this name already exists.");
        return prevGoals;
      }
      const goalWithId = { ...newGoal, id: uuidv4() };
      return [...prevGoals, goalWithId];
    });
  };

  const removeSavingsGoal = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this goal?");
    if (confirmation) {
      setSavingsGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    }
  };

  const editSavingsGoal = (updatedGoal) => {
    if (!updatedGoal.name || updatedGoal.targetAmount < 0 || updatedGoal.currentAmount < 0) {
      alert("Invalid goal data.");
      return;
    }
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

export default SavingsGoalsPage;



