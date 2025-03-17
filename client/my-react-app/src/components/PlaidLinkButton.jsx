import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

const PlaidLinkButton = ({ onSuccess }) => {
  const [plaidToken, setPlaidToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaidToken = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("plaidLinkToken");

        if (!token) {
          const response = await fetch(
            "http://localhost:3000/api/plaid/token",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch Plaid token");
          }

          const data = await response.json();
          token = data.token;
          localStorage.setItem("plaidLinkToken", token);
        }

        setPlaidToken(token);
      } catch (err) {
        console.error("Error fetching Plaid token:", err);
        setError("Failed to initialize Plaid. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaidToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: plaidToken,
    onSuccess: async (publicToken, metadata) => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        alert("Authentication token is missing. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ publicToken, metadata }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        alert("Account linked successfully!");
        onSuccess();
      } catch (error) {
        console.error("Error linking account with Plaid:", error);
        alert("Failed to link account. Please try again.");
      }
    },
    onExit: (err) => {
      if (err) {
        console.error("Plaid Link exited with error:", err);
      }
    },
  });

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={open}
        disabled={!ready || !plaidToken || loading || error}
      >
        {loading ? "Loading..." : "Link Bank Account"}
      </button>
    </div>
  );
};

export default PlaidLinkButton;
