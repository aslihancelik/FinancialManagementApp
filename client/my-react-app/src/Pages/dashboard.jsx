import { useAuth } from "../Context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Main content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Welcome, {user?.name}</h1>
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
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/bills">📋 Bills</Link>
          <Link to="/savings-goals">💰 Goals</Link>
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "none",
              color: "red",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default Dashboard;
