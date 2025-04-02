import { useAuth } from "../Context/authContext"; // Corrected path
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Wallet from "../components/Account_Management/Wallet";
import TransactionsPage from "./TransactionsPage";
// import "../App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user data from context

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1E88E5",
          padding: "1rem",
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Penny Pinchers LLC
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "2rem", //remove after this if not liked css
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Welcome, {user?.firstName}</h1>
        <p>Email: {user?.email}</p>
        <p>Your financial data will be displayed here.</p>
      </main>

      {/* Bottom Nav */}
      <footer
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderTop: "1px solid #ccc",
          padding: "1rem 0",
        }}
      >
        <nav style={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/dashboard/wallet">💳Wallet</Link>
          <Link to="/transactions">💲Transactions</Link>
          <Link to="/bills">📋Bills</Link>
          <Link to="/savings-goals">💰Goals</Link>
          {/* <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "none",
              color: "red",
              cursor: "pointer",
            }}
          >
            🚪 Logout */}
          {/* </button> */}
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;
