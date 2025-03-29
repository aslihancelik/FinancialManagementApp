import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import AuthPage from "../src/Components/Authentication/AuthPage"; // Corrected path
import BillsPage from "./Pages/BillsPage";
import SavingsGoalsPage from "../src/Pages/SavingsGoalPage"; // Corrected path

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<AuthPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <BillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings-goals"
            element={
              <ProtectedRoute>
                <SavingsGoalsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;