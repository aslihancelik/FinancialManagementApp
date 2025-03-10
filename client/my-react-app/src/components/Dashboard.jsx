import { useState, useEffect } from "react";
import AccountList from "./AccountList";
import BalanceSummary from "./BalanceSummary";

const Dashboard = () => {
    const[accounts, setAccounts] = useState([]);

    //fetch accounts from API when component mounts
    useEffect(() => {
        fetch("")
    })
}
export default Dashboard;