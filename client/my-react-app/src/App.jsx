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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          {/* ✅ Replace separate login/signup routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
