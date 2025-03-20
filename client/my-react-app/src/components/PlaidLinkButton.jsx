import React from "react";

const PlaidLinkButton = ({ onAccountLinked }) => {
  const handleMockLink = () => {
    console.log("Mock Plaid: Simulating account linking...");

    if(typeof onAccountLinked === "function") {
      // Simulate successful linking
      onAccountLinked("mock_public_token_123456");
    }else {
      console.log("onAccountLinked is not a function");
    }
    
  };

  return <button onClick={handleMockLink}>Connect a Mock Bank Account</button>;
};

export default PlaidLinkButton;
