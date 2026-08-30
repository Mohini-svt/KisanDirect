import { useState } from "react";
import "./FarmerDashboard.css";

function FarmerDashboard() {
  const [farmerName, setFarmerName] = useState("");
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  const [crops, setCrops] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!farmerName || !cropName || !quantity || !rate) {
      alert("Please fill in all fields");
      return;
    }

    const newCrop = {
      id: Date.now(),
      farmerName,
      cropName,
      quantity,
      rate,
    };

    setCrops([...crops, newCrop]);

    setFarmerName("");
    setCropName("");
    setQuantity("");
    setRate("");
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  return (
    <div className="farmer-dashboard">
      <h1>🌱 KisanDirect Farmer Dashboard</h1>

      <div className="dashboard-container">
        <div className="add-crop-section">
          <h2>🌱 Add Your Crop</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Farmer Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Crop Name</label>
              <input
                type="text"
                placeholder="Enter crop name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Quantity (Kg)</label>
              <input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Rate (₹ per Kg)</label>
              <input
                type="number"
                placeholder="Enter rate per Kg"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <button type="submit">Add Crop to Stock</button>
          </form>
        </div>

        <div className="crop-list-section">
          <h2>📦 All Available Stock</h2>

          <table>
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {crops.length === 0 ? (
                <tr>
                  <td colSpan="5">No crops added yet</td>
                </tr>
              ) : (
                crops.map((crop) => (
                  <tr key={crop.id}>
                    <td>{crop.farmerName}</td>
                    <td>{crop.cropName}</td>
                    <td>{crop.quantity} kg</td>
                    <td>₹{crop.rate}/kg</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCrop(crop.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;