import React from 'react';

const SavingsGoalList = ({ savingsGoals, removeSavingsGoal, editSavingsGoal }) => {
  return (
    <div>
      <h3>Your Current Savings Goals</h3>
      {savingsGoals.length === 0 ? (
        <p>No savings goals added yet.</p>
      ) : (
        <ul>
          {savingsGoals.map((goal) => (
            <li key={goal.id}>
              <h4>{goal.name}</h4>
              <p>Target: ${goal.targetAmount}</p>
              <p>Current: ${goal.currentAmount}</p>
              <p>Progress: {(goal.currentAmount / goal.targetAmount * 100).toFixed(2)}%</p>
              <button onClick={() => editSavingsGoal(goal)}>Edit</button>
              <button onClick={() => removeSavingsGoal(goal.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavingsGoalList;
