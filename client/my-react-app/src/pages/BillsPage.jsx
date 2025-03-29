import React, { useState } from "react";
import BillsList from "../components/BillsList";
import BillForm from "../components/BillForm";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

// Example initial data
const initialBills = [
  { id: uuidv4(), name: "Netflix", amountDue: 15, frequency: "Monthly" },
  { id: uuidv4(), name: "Electricity", amountDue: 50, frequency: "Monthly" },
];

const BillsPage = () => {
  const [bills, setBills] = useState(initialBills);

  const addBill = (newBill) => {
    setBills((prevBills) => {
      // Check for duplicates by name and frequency
      const billExists = prevBills.some(
        (bill) =>
          bill.name === newBill.name && bill.frequency === newBill.frequency
      );
      if (billExists) {
        alert("Bill with this name and frequency already exists.");
        return prevBills;
      }
      // Generate unique ID and add the new bill
      const billWithId = { ...newBill, id: uuidv4() };
      return [...prevBills, billWithId];
    });
  };

  const removeBill = (id) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  const editBill = (updatedBill) => {
    if (!updatedBill.name || updatedBill.amountDue <= 0) {
      alert("Invalid bill data.");
      return;
    }
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
  };

  return (
    <div>
      <h2>Recurring Bills</h2>
      <BillsList bills={bills} onDelete={removeBill} onEdit={editBill} />
      <BillForm addBill={addBill} />
    </div>
  );
};

export default BillsPage;
