import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route path="/add-transaction" element={<AddTransactionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
