import { useState, useEffect } from "react";
import AccountList from "./AccountList";
import BalanceSummary from "./BalanceSummary";

const Dashboard = () => {
    const[accounts, setAccounts] = useState([]);
    //fetch accounts from API
    const fetchAccounts = async () => {
        const res = await fetch("http://");
        const data = await res.json();
        setAccounts(data);
    };

    //fetch accounts from API when component mounts
    useEffect(() => {
        fetchAccounts();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            {/*Show total balance */}
            <BalanceSummary accounts={accounts} />

            {/*Display list of accounts */}
            <AccountList accounts={accounts} setAccounts={setAccounts} />
        </div>
    );
}
export default Dashboard;