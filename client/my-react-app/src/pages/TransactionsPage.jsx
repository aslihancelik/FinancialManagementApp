// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TransactionList from "../components/TransactionList";
// import axios from "axios";


// const TransactionsPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/transactions"
//         );
//         console.log(transactions)
//         setTransactions(response.data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   return (
//     <div>
//       <button onClick={() => navigate("/add-transaction")}>
//         Add Transaction
//       </button>
//       <TransactionList transactions={transactions} />
//     </div>
//   );
// };

// export default TransactionsPage;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import { fetchTransactions } from "../api/transactionsApi"; // Import the function

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions(); // Use API function
        console.log(response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getTransactions();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/add-transaction")}>
        Add Transaction
      </button>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
