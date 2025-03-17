// pages/Dashboard.jsx
import React from 'react';
import Bills from '../components/Bills';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <Bills /> {/* Render the Bills component */}
    </div>
  );
};

export default Dashboard;
