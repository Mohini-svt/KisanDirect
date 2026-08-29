import { registerUser } from "../api/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  
const handleRegister = (event) => {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  const userData = {
    name,
    email,
    password,
    role,
  };

  registerUser(userData);

  setSuccess("Registration successful!");
};



  return (
    <div className="register-container">
      <div className="register-box">
        <h1>KisanDirect</h1>
        <p>Create your account</p>

        <div className="role-selection">
          <button
            className={role === "farmer" ? "active" : ""}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>

          <button
            className={role === "buyer" ? "active" : ""}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
        </div>


{error && <p className="error-message">{error}</p>}

{success && <p className="success-message">{success}</p>}



        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;