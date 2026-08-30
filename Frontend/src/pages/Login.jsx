import { loginUser } from "../api/auth";
import { useState } from "react";
import "./Login.css";
import { Link , useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  {/*const handleLogin = (event) => {
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

if (role === "Farmer") {
  navigate("/farmer/dashboard");
} else if (role === "Buyer") {
  navigate("/buyer/dashboard");
}



  setSuccess("Login successful!");
};*/}

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role.toLowerCase(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Login Successful!");
        console.log("Logged in user details:", data.user);
      } else {
        setError(data.error || "Login Failed. Please check you details.");
      }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Cannot connect to Django backend.Ensure server is running!");
    }
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