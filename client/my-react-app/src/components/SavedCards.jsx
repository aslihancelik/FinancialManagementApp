import React, { useState, useEffect } from "react";
import { fetchAccounts } from "./api";

const SavedCards = () => {
  //state to store saved credit cards
  const [SavedCards, setSavedCards] = useState([]);
//fetch saved credit cards when the components mounts
  useEffect(() => {
    const getSavedCards =async () => {
      try {
        //fetch all user accounts
        const accounts = await fetchAccounts();
        //filter and keep only credit card accounts
        const creditCards = accounts.filter((acc) => acc.type.toLowerCase() === "credit card");
        setSavedCards(creditCards);
    } catch (error) {
      console.error("Error fetching saved cards:",error);
      alert("Failed to fetch saved cards.");
      }
    };
    getSavedCards();  //call function to fetch saved cards
  }, []); //empty dependency array ensures this tuns only once on mount

  return (
    <div className="container">
      <h1>Saved Cards</h1>
      {/*display list of saved credit cards */}
      <div className="saved-cards">
        {SavedCards.length > 0 ? (
          SavedCards.map((card) => (
            <div key={card._id} className="card">
              {/*display last 4 digits of the card number */}
              <p>
                **** **** **** {card.creditCard?.number.slice(-4) || "XXXX"}
              </p>
              {/*display cardholder's name */}
              <p>{card.name}</p>
              {/*display  exp date*/}
              <p>Exp: {card.creditCard?.expDate || "MM/YY"}</p>
            </div>
          ))
        ) : (
          <p>No saved cards found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedCards;