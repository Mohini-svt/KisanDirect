import { useNavigate, Link} from "react-router-dom";
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

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role.toLowerCase(), // Ensures "farmer" or "buyer" format matches Django choices
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", role.toLowerCase());
        }
        // 2. Automatically redirect 
        setTimeout(() => {
          if (role.toLowerCase() === "buyer") {
            navigate("/buyer/dashboard");
          } else if (role.toLowerCase() === "farmer") {
            navigate("/farmer/dashboard");
          } else {
            navigate("/login");
          }
        }, 1000); // 1 second delay so they see "Registration successful!"
      } else {
        // Formats error messages returned by Django serializer
        const errorMessage =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Registration failed.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Cannot connect to Django backend. Ensure server is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <Link to="/" className="home-link">
          ← Back to Home
        </Link>


        <div className="brand">
          {/* leaf mark */}
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 20c8 0 16-6 16-16C10 4 4 12 4 20Z"
              fill="currentColor"
            />
            <path
              d="M4 20c4-4 8-8 16-16"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
          <h1>KisanDirect</h1>
        </div>
        <p>Create your account</p>

        <div className="role-selection">
          <button
            type="button"
            className={`role-btn ${role === "farmer" ? "active" : ""}`}
            onClick={() => setRole("farmer")}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21c0-5 3-7 3-11a3 3 0 0 0-6 0c0 4 3 6 3 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M12 12c0-3-2-4-2-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Farmer
          </button>

          <button
            type="button"
            className={`role-btn ${role === "buyer" ? "active" : ""}`}
            onClick={() => setRole("buyer")}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 8h12l-1 12H7L6 8Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M9 8a3 3 0 0 1 6 0"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            Buyer
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M5 20c1.2-4 4-5.8 7-5.8s5.8 1.8 7 5.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.5 6.5h17v11h-17v-11Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="5"
                y="10.5"
                width="14"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="5"
                y="10.5"
                width="14"
                height="9"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 14v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
