import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🌱</span>
        <h2>KisanDirect</h2>
      </div>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">👥</span>
          User Management
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">📦</span>
          Order Monitoring
        </NavLink>

        <NavLink
          to="/admin/logistics"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">🚚</span>
          Logistics Status
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>Admin Panel</p>
      </div>
    </aside>
  );
}

export default AdminSidebar;