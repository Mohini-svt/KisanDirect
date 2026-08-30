
 import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./AdminDashboard.css";

import users from "../../data/users";
import orders from "../../data/orders";


const stats = [
  {
    title: "Total Users",
    value: users.length,
  },
  {
    title: "Farmers",
    value: users.filter((user) => user.role === "Farmer").length,
  },
  {
    title: "Buyers",
    value: users.filter((user) => user.role === "Buyer").length,
  },
  {
    title: "Active Orders",
    value: orders.filter(
      (order) => order.status !== "Delivered"
    ).length,
  },
];




function AdminDashboard() {
    
    return (
  <div className="admin-layout">
    <AdminSidebar />

    <main className="admin-content">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of KisanDirect platform</p>
      </div>

      <div className="stats-container">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

<div className="recent-orders">
  <h2>Recent Orders</h2>

  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Farmer</th>
        <th>Buyer</th>
        <th>Product</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {orders.slice(0, 3).map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.farmer}</td>
          <td>{order.buyer}</td>
          <td>{order.product}</td>
          <td>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </main>
  </div>
);

}

export default AdminDashboard;