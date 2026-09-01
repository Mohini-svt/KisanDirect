import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerDashboard.css";

function BuyerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/crops/")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  const filteredCrops = crops.filter((crop) => {
    const cropTitle = crop.name || crop.cropName || "";
    const farmerName = crop.farmer_name || "";
    const cropRate = Number(crop.price_per_kg || crop.price || crop.rate || 0);

    const matchesSearch =
      cropTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      maxPrice === "" || cropRate <= Number(maxPrice);

    const matchesQuantity =
      minQuantity === "" || Number(crop.quantity || 0) >= Number(minQuantity);

    return matchesSearch && matchesPrice && matchesQuantity;
  });

  return (
    <div className="buyer-dashboard">
      <h1>🛒 KisanDirect Marketplace</h1>
      <p>Explore fresh crops directly from farmers</p>

      <div className="buyer-content">
        <h2>Available Crops</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search crops or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum price (₹/kg)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum quantity (kg)"
            value={minQuantity}
            onChange={(e) => setMinQuantity(e.target.value)}
          />
        </div>

        <div className="crop-grid">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div className="crop-card" key={crop.id}>
                <h3>{crop.name || crop.cropName}</h3>
                <p>
                  <strong>Farmer: </strong>
                  {crop.farmer_name || "Unknown Farmer"}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {crop.quantity} kg
                </p>
                <p>
                  <strong>Rate: </strong>
                  ₹{crop.price_per_kg || crop.price || crop.rate}/kg
                </p>
                <button onClick={() => navigate(`/buyer/crop/${crop.id}`)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="no-crops">No crops found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;