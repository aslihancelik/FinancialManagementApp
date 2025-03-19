import { useState, useEffect } from 'react'
import LinkAccount from "./components/LinkAccount"; // Import the LinkAccount component
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [linkToken, setLinkToken] = useState(null);

  // Fetch the link token automatically when the component mounts
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/create_link_token`
        );
        const data = await response.json();
        setLinkToken(data.link_token); // Save the link token in state
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    fetchLinkToken();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>Financial Management App</h1>
      <p>Link your bank accounts and credit cards seamlessly!</p>
      {/* Pass the dynamically fetched link token to LinkAccount */}
      {linkToken ? <LinkAccount linkToken={linkToken} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;





