
import { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import orders from "../../data/orders";

function OrderMonitoring() {

const [selectedStatus, setSelectedStatus] = useState("All");

const filteredOrders =
  selectedStatus === "All"
    ? orders
    : orders.filter((order) => order.status === selectedStatus);




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
                  <td>{order.id}</td>
                  <td>{order.farmer}</td>
                  <td>{order.buyer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
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

export default OrderMonitoring;