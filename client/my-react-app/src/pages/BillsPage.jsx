import React, { useState } from 'react';
import BillsList from '../components/BillsList';
import BillForm from '../components/BillForm';

// Example initial data
const initialBills = [
  { id: 1, name: 'Netflix', amountDue: 15, frequency: 'Monthly' },
  { id: 2, name: 'Electricity', amountDue: 50, frequency: 'Monthly' },
];

const BillsPage = () => {
  const [bills, setBills] = useState(initialBills);

  const addBill = (newBill) => {
    setBills((prevBills) => [...prevBills, newBill]);
  };

  const removeBill = (id) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  const editBill = (updatedBill) => {
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
  };

  return (
    <div>
      <h2>Recurring Bills</h2>
      <BillsList bills={bills} removeBill={removeBill} editBill={editBill} />
      <BillForm addBill={addBill} />
    </div>
  );
};

export default BillsPage;

