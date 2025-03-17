import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth"; // ✅ Correct API function

const Signup = () => {
  // ✅ Component name matches file name
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Input validation
    if (!formData.email.includes("@")) {
      setError("Invalid email format");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(formData); // ✅ Calls the correct function
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup; // ✅ Component name matches file name
