import { useAuth } from "../Context/authContext"; // Corrected path

const Dashboard = () => {
  const { user } = useAuth(); // Access user data from context

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Your financial data will be displayed here.</p>
    </div>
  );
};

export default Dashboard;
