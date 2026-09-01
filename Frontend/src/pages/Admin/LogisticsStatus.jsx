import { useState, useEffect } from "react";
import "./LogisticsStatus.css";
import AdminSidebar from "../../components/Admin/AdminSidebar";

function LogisticsStatus() {
  const [logistics, setLogistics] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logistics/")
      .then((res) => res.json())
      .then((data) => setLogistics(data))
      .catch((err) => console.error(err));
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
              {logistics.map((item) => (
                <tr key={item.id || item.orderId}>
                  <td>#{item.order_id || item.order || item.id || item.ordered}</td>
                  <td>{typeof item.crop === "object" ? item.crop?.name : item.product || item.crop_name || "N/A"}</td>
                  <td>{typeof item.driver === "object" ? item.driver?.name : item.driver || "Unassigned"}</td>
                  <td>{item.destination || item.delivery_address || "N/A"}</td>

                  <td>
                    <span
                      className={`status ${item.status?.toLowerCase() === "delivered"
                          ? "delivered"
                          : item.status?.toLowerCase().includes("transit")
                            ? "processing"
                            : "pending"
                        }`}
                    >
                      {item.status}
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

export default LogisticsStatus;