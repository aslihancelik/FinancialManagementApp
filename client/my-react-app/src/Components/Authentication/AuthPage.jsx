import { useState } from "react";
import { signup, login } from "../../api/auth"; // Import API calls
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // ✅ Changed 'username' to 'name' to match backend
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
        response = await signup({
          name: formData.name, // ✅ Change 'username' to 'name' to match backend
          email: formData.email,
          password: formData.password,
        });
      }

      // ✅ Fix: Ensure token is stored properly
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      } else {
        throw new Error("Token not received from server.");
      }

      // ✅ Fix: Store user details correctly
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
      });

      navigate("/dashboard"); // Redirect after login/signup
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
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
    </div>
  );
};

export default AuthPage;
