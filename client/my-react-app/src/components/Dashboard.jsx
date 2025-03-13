import { useState, useEffect } from "react";
import AccountList from "../components/AccountList";
import BalanceSummary from "../components/BalanceSummary";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Error fetching accounts:", err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <BalanceSummary accounts={accounts} />
      <AccountList />
    </div>
  );
};

export default Dashboard;
