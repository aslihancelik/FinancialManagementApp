import React from "react";
import { Routes, Route } from "react-router-dom"; // You don't need to import Router here anymore
import { AuthProvider } from "./Context/authContext";
import ProtectedRoute from "./components/Authentication/protectedRoute";
import AuthPage from "./components/Authentication/AuthPage";
import Wallet from "./components/Account_Management/Wallet";
import LinkCard from "./components/Account_Management/LinkCard";
import SavedCards from "./components/Account_Management/SavedCards";
import LinkedAccounts from "./components/Account_Management/LinkedAccounts";
import Login from "./components/Authentication/login";
import Dashboard from "./pages/dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import BillsPage from "./Pages/BillsPage";
import SavingsGoalsPage from "../src/Pages/SavingsGoalPage"; // Corrected path
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import EditTransactionPage from "./pages/EditTransactionPage";

const App = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Routes>
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
          <Route
            path="/dashboard/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wallet/SavedCard"
            element={
              <ProtectedRoute>
                <SavedCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/LinkedAccounts"
            element={
              <ProtectedRoute>
                <LinkedAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/LinkCard"
            element={
              <ProtectedRoute>
                <LinkCard />
              </ProtectedRoute>
            }
          />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoute>
                <AddTransactionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-transaction/:id"
            element={
              <ProtectedRoute>
                <EditTransactionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
