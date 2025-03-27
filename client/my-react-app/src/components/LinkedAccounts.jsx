import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import AccountList from "./AccountList";
import { fetchAccounts } from "./api";

const LinkedAccounts = () => {
  // State to store linked credit card and bank accounts
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  // Fetch linked accounts when component mounts
  useEffect(() => {
    const getAccounts = async () => {
     try {
        // Retrieve authentication token from localStorage
      //  const token = localStorage.getItem("token");

        // Check if token exists
       // if (!token) {
       //   alert("You must be logged in to view linked accounts.");
       //   navigate("/login");
       //   return;
       // }

        // Call the API to fetch accounts
        const accounts = await fetchAccounts();

        // Filter for credit card and bank accounts 
        const creditCards = accounts.filter(
          (acc) => acc.type.toLowerCase() === "credit card"
        );

        setLinkedAccounts(creditCards); // Set filtered accounts in state
      } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("An error occurred while fetching linked accounts.");
      } finally {
        setLoading(false); // Hide loading state after data fetch
      }
    };
    getAccounts(); // Call the function to fetch accounts
  }, []); // Dependency array ensures the effect runs once on mount

  // Loading state
  if (loading) {
    return <p>Loading accounts...</p>; 
  }
  if(error) {
    return <p>{Error}</p>
  }

  return (
    <div className="container">
      <h1>Linked Accounts</h1>
      <AccountList accounts={linkedAccounts} />
    </div>
  );
};

export default LinkedAccounts;
