import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/authContext";
import ProtectedRoute from "./components/Authentication/protectedRoute";
import AuthPage from "./components/Authentication/AuthPage";
import Dashboard from "./components/Wallet"; 
import LinkCard from "./components/LinkCard";
import SavedCards from "./components/SavedCards"; 
import LinkedAccounts from "./components/LinkedAccounts"; 
import Login from "./components/Authentication/login";

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrapping the app with AuthProvider */}
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected route for dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Public routes for saved cards and linked accounts */}
          <Route path="/saved-cards" element={<SavedCards />} />
          <Route path="/linked-accounts" element={<LinkedAccounts />} />

          {/* Route to add a new card */}
          <Route path="/add-card" element={<LinkCard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
