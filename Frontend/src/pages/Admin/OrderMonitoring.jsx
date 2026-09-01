import { useState, useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function OrderMonitoring() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status?.toLowerCase() === selectedStatus.toLocaleLowerCase());




  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="dashboard-header">
          <h1>Order Monitoring</h1>
          <p>Track and manage all orders on KisanDirect</p>
        </div>

        <div className="recent-orders">
          <h2>All Orders</h2>

          <div className="filter-container">
            <label htmlFor="status">Filter by Status: </label>

            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>




          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Farmer</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{typeof order.farmer === "object" ? order.farmer?.name || order.farmer?.username : order.farmer || "N/A"}</td>
                  <td>{typeof order.buyer === "object" ? order.buyer?.name || order.buyer?.username : order.buyer || "N/A"}</td>
                  <td>{typeof order.crop === "object" ? order.crop?.name : order.product || order.crop_name || "N/A"}</td>
                  <td>{order.quantity} kg</td>
                  <td>
                    <span className={`status ${order.status ? order.status.toLowerCase() : "pending"}`}>
                      {order.status || "Pending"}
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

export default OrderMonitoring;