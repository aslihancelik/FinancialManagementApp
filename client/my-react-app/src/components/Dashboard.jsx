import { useState, useEffect } from "react";
import AccountList from "../components/AccountList";
import BalanceSummary from "../components/BalanceSummary";
import PlaidLinkButton from "../components/PlaidLinkButton";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  //fetch accounts from the backend on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) {
        setError("Authentication token is missing. Please log in.");
        return;
    }

    fetch("http://localhost:3000/api/accounts", {
        headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch accounts.");
        }
        return res.json();
    })
      .then((data) => setAccounts(data))
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      setError("Unable to load accounts. Please try again later.");
    });
  }, []);
  const handlePlaidSuccess = (newAccounts) => {
    setAccounts(newAccounts);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style= {{color: "red"}}>{error}</p>}

      {/*display total balance */}
      <BalanceSummary accounts={accounts} />

      {/*button to link a bank account using Plaid */}
       <PlaidLinkButton onSuccess={handlePlaidSuccess} /> 

        {/*display list of accounts */}
      <AccountList  accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
};

export default Dashboard;
