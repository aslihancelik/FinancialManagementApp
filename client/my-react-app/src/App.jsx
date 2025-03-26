import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LinkCard from "./components/LinkCard";
import SavedCards from "./components/SavedCards";
import LinkedAccounts from "./components/LinkedAccounts";
import Login from "./components/Login";
//import {fetchAccounts} from "./components/api"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saved-cards" element={<SavedCards />} />
        <Route path="/linked-accounts" element={<LinkedAccounts />} />
        <Route path="/add-card" element={<LinkCard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
