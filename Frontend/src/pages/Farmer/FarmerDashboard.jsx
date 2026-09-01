import { useState, useEffect } from "react";
import "./FarmerDashboard.css";

function FarmerDashboard() {
  const [farmerName, setFarmerName] = useState("");
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/crops/");
      if (response.ok) {
        const data = await response.json();
        setCrops(data);
      }
    } catch (err) {
      console.error("Failed to fetch crops:", err);
    }
  };

  {/*const handleSubmit = (e) => {
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
  };*/}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!farmerName || !cropName || !quantity || !rate) {
      alert("Please fill in all fields");
      return;
    }
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

    const newCrop = {
      farmer: loggedInUser.id || 1,      // Maps to Django's farmer ForeignKey
      name: cropName,                    // Maps to Django's name field
      quantity: parseInt(quantity),      // Maps to Django's quantity
      price_per_kg: parseFloat(rate),   // Maps to Django's price_per_kg
    };
   {/* const newCrop = {
      name: cropName,
      price: parseFloat(rate),
      quantity: parseInt(quantity),
      location: "Default Location", // Required by model if non-nullable
      description: `Farmer: ${farmerName}`,
    };*/}

    try {
      const response = await fetch("http://127.0.0.1:8000/api/crops/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCrop),
      });

      if (response.ok) {
        alert("Crop added to database successfully!");
        setFarmerName("");
        setCropName("");
        setQuantity("");
        setRate("");
        fetchCrops(); // Refresh table list instantly
      } else {
        alert("Failed to save crop to backend.");
      }
    } catch (err) {
      console.error("Error adding crop:", err);
    }
  };


  const deleteCrop = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/crops/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCrops(crops.filter((crop) => crop.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete crop:", err);
    }
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
                    <td>{crop.farmerName || crop.description || "N/A"}</td>
                    <td>{crop.name || crop.cropname}</td>
                    <td>{crop.quantity} kg</td>
                    <td>₹{crop.price || crop.rate}/kg</td>
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