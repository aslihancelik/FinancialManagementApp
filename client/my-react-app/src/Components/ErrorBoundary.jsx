import { Component } from "react";

class ErrorBoundary extends Component { // ErrorBoundary component
  constructor(props) { // Constructor with props
    super(props); // Call super with props
    this.state = { hasError: false }; // Set initial state
  }

  static getDerivedStateFromError(error) { // getDerivedStateFromError method
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {  // componentDidCatch method
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {  
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
