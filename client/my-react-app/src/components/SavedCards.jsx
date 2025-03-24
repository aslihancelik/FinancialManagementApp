import React, { useState, useEffect } from "react";
import { fetchAccounts } from "./api";

const SavedCards = () => {
  const [SavedCards, setSavedCards] = useState([]);
  

  useEffect(() => {
    fetchAccounts().then((accounts)=> {
      setSavedCards(accounts.filter((acc) => acc.type === "credit card"));
    });
  }, []);
  return (
    <div className="container">
      <h1>Saved Cards</h1>
      <div className="saved-cards">
        {SavedCards.length > 0 ? (
          SavedCards.map((card) => (
            <div key={card._id} className="card">
              <p>**** **** **** {card.creditCard?.number. slice(-4) || "XXXX"}</p>
              <p>{card.name}</p>
              <p>Exp: {card.creditCard?.expDate || "MM/YY"}</p>
            </div>
          ))
        ) : (
          <p>No saved cards fund.</p>
        )}
      </div>
    </div>
  );
};

export default SavedCards;