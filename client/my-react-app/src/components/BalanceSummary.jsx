import React from "react";

const BalanceSummary = ({ accounts = [] }) => {
  // Calculate the total balance by summing up each account balance
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + (acc.balance || 0),
    0
  );

  return (
    <div>
      {/* Display total balance or a message if no accounts exist */}
      <h2>
        {totalBalance > 0 ? (
          <>
            Total Balance:{" "}
            {totalBalance.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </>
        ) : (
          <span>No accounts linked</span> // Show if no accounts
        )}
      </h2>
    </div>
  );
};

export default BalanceSummary;
