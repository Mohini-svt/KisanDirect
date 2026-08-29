import { loginUser } from "../api/auth";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const [error, setError] = useState("");
const [success, setSuccess] = useState("");



const handleLogin = (event) => {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!email || !password) {
    setError("Please fill in all fields!");
    return;
  }

  const loginData = {
    email,
    password,
    role,
  };

  loginUser(loginData);

  setSuccess("Login successful!");
};



  return (
    <div className="login-container">
      <div className="login-box">
        <h1>KisanDirect</h1>
        <p>Login to your account</p>

        <div className="role-selection">
          <button
            className={`role-btn ${role === "Farmer" ? "active" : ""}`}
            onClick={() => setRole("Farmer")}
          >
            Farmer
          </button>

          <button
            className={`role-btn ${role === "Buyer" ? "active" : ""}`}
            onClick={() => setRole("Buyer")}
          >
            Buyer
          </button>
        </div>

{error && <p className="error-message">{error}</p>}

{success && <p className="success-message">{success}</p>}



        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;