import { Component } from "react";
import {Link } from "react-router-dom"; // Optional: link back to home page for users to retry

class ErrorBoundary extends Component { // ErrorBoundary component
  constructor(props) { // Constructor with props
    super(props); // Call super with props
    this.state = { hasError: false, errorMessage: "" }; // Set initial state
  }

  static getDerivedStateFromError(error) { // getDerivedStateFromError method
    return { hasError: true, errorMessage: error.message }; // Capture the error message
  }

  componentDidCatch(error, errorInfo) {  // componentDidCatch method
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You can send error info to an external logging service here
  }

  render() {  
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong. Please try again later.</h2>
          {/* Optional: show more error details */}
          <p>{this.state.errorMessage}</p>
          <Link to="/">Go Back to Home</Link>
          {/* Allow users to navigate away */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
