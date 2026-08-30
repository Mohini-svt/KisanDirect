import "./LogisticsStatus.css";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import logistics from "../../data/logistics";

function LogisticsStatus() {
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
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{item.product}</td>
                  <td>{item.driver}</td>
                  <td>{item.destination}</td>

                  <td>
                    <span
                      className={`status ${
                        item.status === "Delivered"
                          ? "delivered"
                          : item.status === "In Transit"
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