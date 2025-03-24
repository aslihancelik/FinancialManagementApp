import { useState } from "react";
import { signup, login, linkAccount } from "../../api/auth"; // Import API calls
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password)
      return "Email and password are required.";
    if (
      !isLogin &&
      (!formData.name || formData.password !== formData.confirmPassword)
    )
      return "Passwords do not match or name is missing.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Split the name into firstName and lastName
        const nameParts = formData.name.trim().split(" ");

        const firstName = nameParts[0];
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        response = await signup({
          firstName, // Send split first name
          lastName, // Send split last name
          email: formData.email,
          password: formData.password,
        });
      }

      // ✅ Fix: Store user details correctly
      setUser({
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      });

      navigate("/dashboard"); // Redirect after login/signup
    } catch (error) {
      console.error("❌ Error during authentication:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Separate test function to call `linkAccount`
  const handleLinkAccountTest = async () => {
    try {
      // Hardcoded test data for linking an account
      // const accountData = {
      //   name: "Ari Account",
      //   type: "bank account",
      //   balance: 1000,
      //   bankAccount: {
      //     accountNumber: "123457777",
      //     routingNumber: "987657777",
      //   },
      // };

      // Hardcoded test data for linking a credit card account
      const accountData = {
        name: "Test Credit Card",
        type: "credit card",
        balance: 5000,
        creditCard: {
          number: "4111111111111111", // Example credit card number
          expDate: "12/25", // Expiration date
          cvc: "123", // CVC code
        },
      };

      const response = await linkAccount(accountData); // Call the linkAccount function
      console.log("✅ Test account linked successfully:", response);
      alert("Test account linked successfully!");
    } catch (error) {
      console.error("❌ Error linking test account:", error);
      alert(error.message || "Failed to link test account.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name" // ✅ Change 'Username' to 'Name' to match backend
            value={formData.name}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* ✅ Added Confirm Password Field for Signup */}
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
      {/* Button to test linking an account */}
      <button onClick={handleLinkAccountTest}>Test Link Account</button>
    </div>
  );
};

export default AuthPage;
