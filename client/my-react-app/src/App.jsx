import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import EditTransactionPage from "./pages/EditTransactionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route path="/add-transaction" element={<AddTransactionPage />} />
        <Route path="/edit-transaction/:id" element={<EditTransactionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
