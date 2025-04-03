import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AccountList from "./AccountList";
import api from "./api";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

const LinkedAccounts = () => {
  //state to store linked accounts, form fields, loading state and errors
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountId, setAccountId] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [updatedAccount, setUpdatedAccount] = useState({name:"", balance: 0});

  //  Axios instance with interceptor
  const apiClient = axios.create({
    baseURL: API_URL,
  });

  apiClient.interceptors.request.use(
    (config) => {
      //retrieve authentication token from LocalStorage
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error(" No token found in localStorage");
      }
      return config;
    },
    (error) => {
      console.error(" Interceptor error:", error);
      return Promise.reject(error);
    }
  );

  //  Optimized API call using useCallback
  //fetch linked accounts from the API
  const getAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const accounts = await api.fetchAccounts();
      setLinkedAccounts(accounts);  //update state with fetched accounts
    } catch (error) {
      console.error(" Error fetching accounts:", error);
      setError("An error occurred while fetching linked accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  //fetch accounts when component mounts
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  //fetch a single account by Id
 const fetchAccountById = async () => {
   if (!accountId || accountId.trim() === "" || accountId.length < 10) {
     setError("Please enter a valid account ID.");
     return;
   }

   try {
     const response = await apiClient.get(`/accounts/${accountId}`);
     if (response.data) {
       setSelectedAccount(response.data);
       setUpdatedAccount({
         name: response.data.name || "",
         balance: response.data.balance || 0,
       });
       setError(null);
     } else {
       setError("Account not found.");
     }
   } catch (error) {
     console.error("Error fetching account:", error);
     setError("Failed to fetch account. Please check if the ID is correct.");
   }
 };

  //update an account
  const handleUpdatedAccount = async () => {
    if(!selectedAccount) {
      setError("No account selected.");
      return;
    }
    try {
      await api.updatedAccount(selectedAccount._id || selectedAccount._id, {
        name: updatedAccount.name,
        balance: updatedAccount.balance,
      });
      
      alert("Account updated successfully!");
      setSelectedAccount(null);
      setUpdatedAccount({name: "", balance: 0});
      getAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
      setError("failed to updated account.");
    }
  };


  //  Handle account linking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!accountType || !accountNumber) {
      setError(" Please fill out all fields.");
      return;
    }

    //prepare account data based on selected type
    //bank or credit card
  const accountData =
    accountType === "bank"
      ? {
          name: "User Account",
          type: "bank",
          balance: 0,
          bankAccount: {
            routingNumber: "110000000", // Example routing number
            accountNumber: accountNumber,
          },
        }
      : {
          name: "User Account",
          type: "credit card",
          balance: 0,
          creditCard: {
            number: accountNumber,
            expDate: "12/20/2029", // Example expiry date
            cvc: 333, // Example cvc
          },
        };


    try {
      console.log(" Sending account data:", accountData);
      const response = await apiClient.post("/accounts", accountData);
      console.log(" Account linked successfully:", response.data);

      // Refresh accounts after adding a new account
      await getAccounts();

      // Reset form fields after successful submission
      setAccountType("");
      setAccountNumber("");
      //setError(null);

      alert(" Account linked successfully!");
    } catch (error) {
      console.error(" Error linking account:",error);
      
      //handle different type of errors
      if (error.response) {
      setError(error.response?.data?.message || "Failed to link account.");
    }else if (error.request) { 
      setError("No response from the server.Please try again later.");
       } else {
        setError("An unexpected error occurred. Please try again later.");
       }
    }
  };

  return (
    <div className="container">
      {/*  Display error message */}
      {error && <div className="error-message">{error}</div>}

      {/*  Account linking form */}
      <form onSubmit={handleSubmit}>
        <h2>Link a New Account</h2>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select Account Type</option>
            <option value="bank">Bank</option>
            <option value="credit card">Credit Card</option>
          </select>
        </div>
        <div>
          <label htmlFor="accountNumber">Account Number / Card Number:</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
          <button type="submit">Link Account</button>
        </div>
        <div>
          <h3>Get Account by ID </h3>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Enter account ID"
          />
          <button onClick={fetchAccountById}>Fetch Account By Id</button>
        </div>
        {selectedAccount && (
          <div>
            <h3>Update Account</h3>
            <label>
              Name:
              <input
                type="text"
                value={updatedAccount.name}
                onChange={(e) =>
                  setUpdatedAccount({ ...updatedAccount, name: e.target.value })
                }
              />
            </label>
            <label>
              Balance:
              <input
                type="number"
                value={updatedAccount.balance}
                onChange={(e) =>
                  setUpdatedAccount({
                    ...updatedAccount,
                    balance: Number(e.target.value),
                  })
                }
              />
            </label>
            <button type="button" onClick={handleUpdatedAccount}>
              Update Account
            </button>
          </div>
        )}
   
      </form>

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/dashboard">🏠 Dashboard</Link>
        <Link to="/dashboard/wallet">💳 Wallet</Link>
        <Link to="/transactions">💲Transactions</Link>
        <Link to="/bills">📋 Bills</Link>
        <Link to="/savings-goals">💰 Goals</Link>
      </div>
    </div>
  );
};

export default LinkedAccounts;
