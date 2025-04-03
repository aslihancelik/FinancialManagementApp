import React, { useState, useEffect } from "react";
import AccountList from "./AccountList";
import { fetchAccounts } from "./api";

const SavedCards = () => {
  // State to store saved credit cards
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state for better handling

  // Fetch saved credit cards when the component mounts
  useEffect(() => {
    const getSavedCards = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }
      try {
        // Fetch all user accounts
        const accounts = await fetchAccounts();
        // Filter and keep only credit card accounts
        const creditCards = accounts.filter(
          (acc) => acc.type.toLowerCase() === "credit card"
        );
        setSavedCards(creditCards);
      } catch (error) {
        console.error("Error fetching saved cards:", error);
        setError("Failed to fetch saved cards."); // Store error message in state
      } finally {
        setLoading(false); // Hide loading after the fetch attempt
      }
    };

    getSavedCards(); // Call function to fetch saved cards
  }, []); // Empty dependency array ensures this runs only once on mount

  // If loading, display a loading message or spinner
  if (loading) {
    return <p>Loading saved cards...</p>;
  }

  // If there is an error, display it
  if (error) {
    return <p>{error}</p>;
  }
  const creditCards = accounts.filter(
    (acc) => acc.type.toLowerCase() === "credit card"
  );
  setSavedCards(creditCards); // Each credit card should have an ID here

  return (
    <div className="container">
      <h1>Saved Cards</h1>
      <AccountList accounts={savedCards} />
      {/*uses the accountList components */}
    </div>
  );
};

export default SavedCards;
