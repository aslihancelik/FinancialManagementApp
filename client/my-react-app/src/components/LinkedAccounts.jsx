import React, { useState } from "react";
import { fetchAccounts } from "./api";

const LinkedAccounts = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts().then((accounts) => {
      setLinkedAccounts(accounts.filter((acc) => acc.type === "bank account"));
    });
  }, []);
  return (
    <div className="container">
      <h1>Linked Accounts</h1>
      <div className="accounts-list">
        {linkedAccounts.length > 0 ? (
          linkedAccounts.map((account) => (
            <div key={account._id} className="account-card">
              <h3>{Account.name} </h3>
              <p>
                Routing: ****
                {account.bankAccount?.routingNumber.slice(-4) || "XXXX"}
              </p>
              <p>
                Account: ****
                {account.bankAccount?.accountNumber.slice(-4) || "XXXX"}
              </p>
            </div>
          ))
        ) : (
          <p>No linked accounts found.</p>
        )}
      </div>
    </div>
  );
};

export default LinkedAccounts;
