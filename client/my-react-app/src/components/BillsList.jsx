// import React from 'react';
import { format, isValid } from 'date-fns';

const BillList = ({ bills, onEdit, onDelete }) => {
  return (
    <div className="bill-list">
      <h2>Your Recurring Bills</h2>
      <table>
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Amount Due</th>
            <th>Due Date</th>
            <th>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan="5">No bills available</td>
            </tr>
          ) : (
            bills.map((bill) => {
              const dueDate = bill.dueDate ? new Date(bill.dueDate) : null;
              const formattedDate = dueDate && isValid(dueDate)
                ? format(dueDate, 'MM/dd/yyyy')
                : 'N/A';

              return (
                <tr key={bill.id}>
                  <td>{bill.name}</td>
                  <td>${bill.amountDue}</td>
                  <td>{formattedDate}</td>
                  <td>{bill.frequency}</td>
                  <td>
                    <button onClick={() => onEdit(bill)} aria-label={`Edit ${bill.name} bill`}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(bill.id)} aria-label={`Delete ${bill.name} bill`}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
