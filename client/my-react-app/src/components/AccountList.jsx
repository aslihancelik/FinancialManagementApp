import {useState } from "react";
import AccountForm from "./AccountForm";

const AccountList = ({accounts, setAccounts}) => {
 
    //track which account is being edited
    const [editingAccount, setEditingAccount] = useState(null);
    
    //handle account deletion
    const handleDelete = async (id) => {
        await fetch("", {method: "DELETE"});
       // remove deleted account from state
        setAccounts(accounts.filter((acc) => acc._id !== id));
    };

    //handling saving an account
    const handleSave = async (account) => {
        const method = editingAccount ? "PUT" : "POST";
        const url = editingAccount ? `http://${editingAccount._id}` : "http://";
    
        const res = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"()},
            body: JSON.stringify(account),
       });
            const newAccount = await res.json();
            if(editingAccount) {
                //update existing account in state
            setAccounts(account.map((acc) =>
            (acc.id === newAccount._id ? newAccount : acc)));
            }else {
                //add new account to state
                setAccounts([...accounts, newAccount]);
            }
            //reset editing state
            setEditingAccount(null);
    };
    return ( 
        <div>
            <AccountForm onsubmit={handleSave} existingAccount={-editingAccount} />
            <ul>
                {accounts.map((acc) =>  (
                    <li key={acc._id}>
                        {acc.name}  ({acc.type}) - ${acc.balance.toFixed(2)}
                        <button onClick={() => $setEditingAccount}>Edit</button>  
                        <button onClick={() => handleDelete(acc._id)}>Delete</button>
                         </li>
                ))}
            </ul>
         </div>
    );
};


export default AccountList; 