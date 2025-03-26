const API_URL = "http://localhost:3000/api";
//fetch all accounts
export const fetchAccounts = async () => {
  //first take the jwt token from localStorage
  const token = localStorage.getItem("token");
  //then we make sure the token exists,
    // and if token doesn't exist throw an error
  if (!token) 
    throw new Error("No auth token found");
  try {
    //then make the fetch request to the backend API to get the accounts
    const response = await fetch(`${API_URL}/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", //specify the content type
        "Authorization": `Bearer ${token}`,
      },
    });
    //then if the response is not right, we throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch accounts.");
    }

    //the response body will be returned as JSON
    return await response.json();
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

//add a new bank account
export const addBankAccount = async (account) => {
    try{
        //get the JWT token form the localStorage
        const token = localStorage.getItem("token");
        //if token do not exists throw an error
        if(!token) {
            throw new Error("No token found.Please log in.");
        }

        //make the fetch request to the backend API to add a new bank account
    const response = await fetch(`${API_URL}/bank`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(account), //send the bank account data as the request body
});
//if the response is not right, throw  an error
if(!response.ok) {
    throw new Error("Failed to add bank account.");
}
//return the response body as JSON
return response.json();
    } catch (error) {
        console.log("Error adding bank account:", error);
    }
};

//add a new credit card
export const addCreditCard = async (card) => {
    try {
    //get the JWT token from LocalStorage
    const token = localStorage.getItem("token");
    //see if token exists otherwise throw an error
        if(!token) {
            throw new Error("No token found. Please log in.");
        }
    //make the fetch request to the backend API and add a new credit card
    const response = await fetch(`${API_URL}/credit-card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(card),
    });
    //if the response is no right throw an error
    if(!response.ok) {
        throw new Error("Failed to add credit card.");
    }
    //return the response body as JSON
    return response.json();
}catch (error) {
    console.error("error adding credit card", error);
    }
};