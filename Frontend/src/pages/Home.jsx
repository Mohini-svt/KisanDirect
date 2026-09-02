import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * KishanDirect – Home Page
 *
 * Converted from the original static home.html into a single React
 * functional component. All styling lives in Home.css (imported above),
 * using the same class names as the original markup so the CSS maps
 * 1:1 onto this JSX.
 *
 * Content changes from the original FarmDirect page:
 *  - Brand renamed FarmDirect -> KishanDirect (nav, hero, footer)
 *  - Navbar trimmed to: Home, How It Works, Features, Admin
 *  - "Explore Marketplace" hero button removed
 *  - "How It Works" rebuilt to match the real app flow (Register -> Login ->
 *    Role selection -> Farmer/Buyer dashboards -> Backend/API -> Database),
 *    with no invented AI matching/routing steps
 *  - Features grid: removed "AI Demand Forecasting" and "Smart Logistics"
 *    (AI-driven features that don't exist yet), added "Multi-language
 *    Support" and "Voice Guidance" to reflect real, shipped features
 *  - Removed the "Market Insights" price dashboard card from the hero
 *    (implied live/predicted pricing that isn't part of the app)
 */
export default function Home() {
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    const pass = prompt("Enter Admin Passcode:");
    if (pass === "admin123") { 
      navigate("/admin");
    } else if (pass !== null) {
      alert("Invalid Admin Passcode!");
    }
  };
  return (
    <div className="kd-page">
      {/* NAVBAR */}
      <nav>
        <div className="logo">
          <div className="logo-icon">🌱</div>
          KishanDirect
        </div>

        <ul className="nav-links">
          <li><a href="#top">Home</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="/admin" onClick={handleAdminClick}>Admin</a></li>
        </ul>

        <Link to="/login" className="nav-btn">
            Login / Register
     </Link>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="tag">🌾 Direct • Fair • Simple</div>

          <h1>
            From <span>Farm</span><br />
            Directly to You.
          </h1>

          <p>
            Connecting farmers directly with consumers and bulk
            buyers. Better prices for farmers, lower prices for
            consumers.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="secondary-btn">
               Join as Farmer
         </Link>
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-heading">
          <h2>How KishanDirect Works</h2>
          <p>
            A simple flow that takes a farmer's produce from the
            field to a buyer's cart — register, list or browse,
            and transact, with everything backed by our platform.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Register & Log In</h3>
            <p>
              Create an account and log in as either a Farmer
              or a Buyer to reach your dashboard.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Farmers List Produce</h3>
            <p>
              From the Farmer Dashboard, add crop details —
              quantity, quality and price — and they're added
              straight to stock.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Buyers Browse & Request</h3>
            <p>
              From the Buyer Dashboard, view available crops
              and products, then buy or request the ones you
              need.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Handled by the Platform</h3>
            <p>
              Every listing and request runs through our
              backend and is stored securely in the database,
              keeping both sides in sync.
            </p>
          </div>
        </div>

        <div className="admin-note" id="admin">
          <div className="admin-note-icon">🛠️</div>
          <div>
            <h4>Overseen by Admin</h4>
            <p>
              Admins keep the platform running smoothly —
              managing users, reviewing crop listings, and
              monitoring orders and logistics status from a
              dedicated Admin Dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features" id="features">
        <div className="section-heading">
          <h2>Built for Every Farmer, Every Buyer</h2>
          <p>
            Practical tools that make the marketplace easier to
            use and the supply chain easier to trust.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>Fair Price Discovery</h3>
            <p>
              Help farmers understand the right market price
              before selling their produce.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Market Analytics</h3>
            <p>
              View crop prices, demand trends and market
              opportunities from one dashboard.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">🤝</div>
            <h3>Direct Connections</h3>
            <p>
              Connect farmers directly with consumers,
              retailers and bulk buyers.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">🌍</div>
            <h3>Reduce Food Waste</h3>
            <p>
              Better visibility into stock and demand helps
              reduce unnecessary agricultural wastage.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">🌐</div>
            <h3>Multi-language Support</h3>
            <p>
              Use the platform in the language you're most
              comfortable with, wherever you are.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">🎙️</div>
            <h3>Voice Guidance</h3>
            <p>
              Voice-guided navigation makes listing crops and
              placing orders easier for every user.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div>
          <h2>Ready to make farming simpler?</h2>
          <p>
            Join the digital agricultural marketplace and
            connect directly with buyers.
          </p>
        </div>
        <Link to="/login">Get Started →</Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">🌱 KishanDirect</div>
        <p>Direct Trade • Fair Prices • Better Future</p>
        <p>© 2026 KishanDirect</p>
      </footer>
    </div>
  );
}