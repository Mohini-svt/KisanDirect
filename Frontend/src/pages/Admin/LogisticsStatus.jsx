import { useState, useEffect } from "react";
import "./LogisticsStatus.css";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function LogisticsStatus() {
  const [logistics, setLogistics] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logistics/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLogistics(data);
        } else {
          loadLocalStorageLogistics();
        }
      })
      .catch((err) => {
        console.error(err);
        loadLocalStorageLogistics();
      });

    function loadLocalStorageLogistics() {
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setLogistics(savedOrders);
    }
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <h1>Logistics Status</h1>
        <p>Track delivery and transportation status</p>

        <div className="dashboard-card">
          <h2>All Deliveries</h2>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Driver</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {logistics.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No active deliveries.
                  </td>
                </tr>
              ) : (
                logistics.map((item, index) => (
                  <tr key={item.id || item.orderId || index}>
                    <td>#{item.order_id || item.order || item.id || index + 1}</td>
                    <td>
                      {typeof item.crop === "object"
                        ? item.crop?.name
                        : item.product || item.crop_name || "Produce"}
                    </td>
                    <td>
                      {typeof item.driver === "object"
                        ? item.driver?.name
                        : item.driver || "Express Logistics"}
                    </td>
                    <td>{item.destination || item.delivery_address || "Local Warehouse"}</td>
                    <td>
                      <span
                        className={`status ${item.status ? item.status.toLowerCase() : "pending"
                          }`}
                      >
                        {item.status || "In Transit"}
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

export default LogisticsStatus;