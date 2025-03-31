import { useAuth } from "../Context/authContext"; // Corrected path
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Wallet from "../components/Account_Management/Wallet";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user data from context

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Your financial data will be displayed here.</p>

      { /*<button onClick={() => navigate("wallet/")}>Go to Wallet</button>*/}
      <Link to="/dashboard/wallet">🏠 Dashboard</Link>
      <Link to="/bills">📋 Bills</Link>
      <Link to="/savings-goals">💰 Goals</Link>
    </div>
  );
};

export default Dashboard;
