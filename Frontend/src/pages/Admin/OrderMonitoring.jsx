import { useState, useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function OrderMonitoring() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else {
          loadLocalStorageOrders();
        }
      })
      .catch((err) => {
        console.error(err);
        loadLocalStorageOrders();
      });

    function loadLocalStorageOrders() {
      const localData = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(localData);
    }
  }, []);

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter(
        (order) =>
          order.status?.toLowerCase() === selectedStatus.toLowerCase()
      );

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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id || index}>
                    <td>#{order.id || order.order_id || index + 1}</td>
                    <td>
                      {typeof order.farmer === "object"
                        ? order.farmer?.name || order.farmer?.username
                        : order.farmer || "Ramesh Kumar"}
                    </td>
                    <td>
                      {typeof order.buyer === "object"
                        ? order.buyer?.name || order.buyer?.username
                        : order.buyer || "Green Grocery"}
                    </td>
                    <td>
                      {typeof order.crop === "object"
                        ? order.crop?.name
                        : order.product || order.crop_name || order.crop || "Tomatoes"}
                    </td>
                    <td>{order.quantity || order.qty || "100"} kg</td>
                    <td>
                      <span
                        className={`status ${order.status ? order.status.toLowerCase() : "pending"
                          }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default OrderMonitoring;