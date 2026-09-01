import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import OrderMonitoring from "./pages/Admin/OrderMonitoring";
import LogisticsStatus from "./pages/Admin/LogisticsStatus";
import FarmerDashboard from "./pages/Farmer/FarmerDashboard";
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import CropDetails from "./pages/Buyer/CropDetails";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/orders" element={<OrderMonitoring />} />
      <Route path="/admin/logistics" element={<LogisticsStatus />} />

      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/farmer/dashboard" element={<FarmerDashboard />} />

      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      <Route path="/buyer/crop/:id" element={<CropDetails />} />

    </Routes>



  );
}

export default App;