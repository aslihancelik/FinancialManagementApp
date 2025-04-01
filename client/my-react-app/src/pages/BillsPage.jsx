import React, { useState } from "react";
import BillsList from "../components/BillsList";
import BillForm from "../components/BillForm";
import { v4 as uuidv4 } from "uuid";

// Example initial data
const initialBills = [
  { id: uuidv4(), name: "Netflix", amountDue: 15, frequency: "Monthly" },
  { id: uuidv4(), name: "Electricity", amountDue: 50, frequency: "Monthly" },
];

const BillsPage = () => {
  const [bills, setBills] = useState(initialBills);
  const [billToEdit, setBillToEdit] = useState(null); // ✅ Track the bill being edited

  const addBill = (newBill) => {
    const billExists = bills.some(
      (bill) =>
        bill.name === newBill.name && bill.frequency === newBill.frequency
    );
    if (billExists) {
      alert("Bill with this name and frequency already exists.");
      return;
    }
    const billWithId = { ...newBill, id: uuidv4() };
    setBills((prev) => [...prev, billWithId]);
  };

  const removeBill = (id) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  const updateBill = (updatedBill) => {
    if (!updatedBill.name || updatedBill.amountDue <= 0) {
      alert("Invalid bill data.");
      return;
    }
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill))
    );
    setBillToEdit(null); // ✅ Clear edit state after update
  };

  const handleEditClick = (bill) => {
    setBillToEdit(bill); // ✅ Load selected bill into form
  };

  return (
    <div>
      <h2>Recurring Bills</h2>

      {/* Pass bills and edit handler */}
      <BillsList bills={bills} onDelete={removeBill} onEdit={handleEditClick} />

      {/* Pass both add & update functionality, and the bill being edited */}
      <BillForm
        addBill={addBill}
        editBill={updateBill}
        billToEdit={billToEdit}
      />
    </div>
  );
};

export default BillsPage;
