import React, { useState,useEffect } from "react";

const AccountForm = ({ onSubmit, existingAccount }) => {
  //state to manage form fields
  const [name, setName] = useState("");
  const [type, setType] = useState("bank account");
  const [balance, setBalance] = useState(0);
  const [creditCard, setCreditCard] = useState({number: "", expDate: "", cvc:""});
  const [bankAccount, setBankAccount] = useState({routingNumber: "", accountNumber: ""});

  //let's load existing account data into form if editing an account
useEffect(() =>{
  if(existingAccount) {
    setName(existingAccount.name);
    setType(existingAccount.type);
    setBalance(existingAccount.balance);
    //here we are setting specific account type details if available
    if(existingAccount.type === "credit card") {
      setCreditCard(existingAccount.creditCard || { number: "", expDate: "", cvc: ""});
    } else {
      setBankAccount(existingAccount.bankAccount || { routingNumber: "", accountNumber: ""});
    }
  }
}, [existingAccount]);

//reset account-specific fields when type changes
useEffect(() => {
  if (type === "credit card") {
    setBankAccount({routingNumber: "", accountNumber: ""});
  } else {
    setCreditCard({ number: "", expDate: "", cvc: ""});
  }
}, [type]);
  
//handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const accountData = { name, type, balance}; 
    //include specific fields based on account type
    if(type === "credit card") {
      accountData.creditCard = creditCard;
    } else {
      accountData.bankAccount = bankAccount
    }
    //pass data to parent component
    onSubmit(accountData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*input for account name */}
      <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* dropdown for selecting account type */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="bank account">Bank Account</option>
        <option value=" credit card">Credit Card</option>
      </select>
      {/*input for balance */}
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
        required
      />
      {/*input for credit card detail(only if selected) */}
      {type === " credit card" && (
        <>
          <input
            type="text"
            placeholder="Card Number"
            value={creditCard.number}
            onChange={(e) =>
              setCreditCard({ ...creditCard, number: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            value={creditCard.expDate}
            onChange={(e) =>
              setCreditCard({ ...creditCard, expDate: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="CVC"
            value={creditCard.cvc}
            onChange={(e) =>
              setCreditCard({ ...creditCard, cvc: e.target.value })
            }
            required
          />
        </>
      )}
      {/* inputs for bank account details(only if selected*/}
      {type === "bank account" && (
        <>
          <input
            type="text"
            placeholder="Routing Number"
            value={bankAccount.routingNumber}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, routingNumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Account Number"
            value={bankAccount.accountNumber}
            onChange={(e) =>
              setBankAccount({ ...bankAccount, accountNumber: e.target.value })
            }
            required
          />
        </>
      )}
      {/* submit button*/}
      <button type="submit">
        {existingAccount ? "Update" : "Add"} Account
      </button>
    </form>
  );
};

export default AccountForm;
