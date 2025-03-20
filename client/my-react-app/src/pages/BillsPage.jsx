import React, { useState } from 'react';
import BillsList from '../components/BillsList';
import BillForm from '../components/BillForm';
import { v4 as uuidv4 } from 'uuid';  // To generate unique IDs

// Example initial data
const initialBills = [
  { id: 1, name: 'Netflix', amountDue: 15, frequency: 'Monthly' },
  { id: 2, name: 'Electricity', amountDue: 50, frequency: 'Monthly' },
];

const BillsPage = () => {
  const [bills, setBills] = useState(initialBills);

  const addBill = (newBill) => {
    setBills((prevBills) => {
      const billExists = prevBills.some(bill => bill.name === newBill.name);
      if (billExists) {
        alert("Bill already exists");  // Handle duplicate bills
        return prevBills;
      }
      // Generate unique ID if needed and add the new bill
      const billWithId = { ...newBill, id: uuidv4() };
      return [...prevBills, billWithId];
    });
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
      <BillsList 
        bills={bills} 
        removeBill={removeBill} 
        editBill={editBill} 
      />
      <BillForm addBill={addBill} />
    </div>
  );
};

BillsPage.propTypes = {
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,  // Assuming id is now a string from uuid
      name: PropTypes.string.isRequired,
      amountDue: PropTypes.number.isRequired,
      frequency: PropTypes.string.isRequired,
    })
  ).isRequired,
  addBill: PropTypes.func.isRequired,
  removeBill: PropTypes.func.isRequired,
  editBill: PropTypes.func.isRequired,
};

export default BillsPage;


