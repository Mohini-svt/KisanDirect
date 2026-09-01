import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useState } from "react";
import "./Login.css";

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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    setLoading(true);
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

        localStorage.setItem("user", JSON.stringify(data.user || data));

        const userRole = (data.user?.role || data.role || role).toLowerCase();

        setTimeout(() => {
          if (userRole === "farmer") navigate("/farmer/dashboard");
          else if (userRole === "buyer") navigate("/buyer/dashboard");
          else if (userRole === "admin") navigate("/admin/dashboard");
          else navigate("/");
        }, 1000);
      } else {
        setError(data.error || "Login Failed. Please check your details.");
      }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Cannot connect to Django backend. Ensure server is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

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
        <p>Login to your account</p>

        <div className="role-selection">
          <button
            type="button"
            className={`role-btn ${role === "Farmer" ? "active" : ""}`}
            onClick={() => setRole("Farmer")}
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
            className={`role-btn ${role === "Buyer" ? "active" : ""}`}
            onClick={() => setRole("Buyer")}
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

        <form onSubmit={handleLogin}>
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
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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