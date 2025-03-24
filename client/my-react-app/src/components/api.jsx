const API_URL = "http://localhost:3000/api";
//fetch all accounts
export const fetchAccounts = async () => {
    try{
    const response = await fetch("http://localhost:3000/api/accounts", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
return response.json();
    } catch (error){
        console.error("Error fetching accounts:", error);
        return [];
         }
    };

//add a new bank account
export const addBankAccount = async (account) => {
    await fetch(`${API_BASE_URL}/bank`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(account),
    });
};

//add a new credit card
export const addCreditCard = async (card) => {
    await fetch(`${API_BASE_URL}/credit-card`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(card),
    });
};