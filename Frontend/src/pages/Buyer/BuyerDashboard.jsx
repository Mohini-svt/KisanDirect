import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerDashboard.css";

function BuyerDashboard() {

  const [searchTerm, setSearchTerm] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [minQuantity, setMinQuantity] = useState("");
const navigate = useNavigate();

  const crops = [
    {
      id: 1,
      cropName: "Potato",
      farmerName: "Ramesh Kumar",
      quantity: 100,
      rate: 25,
    },
    {
      id: 2,
      cropName: "Tomato",
      farmerName: "Suresh Patel",
      quantity: 80,
      rate: 30,
    },
    {
      id: 3,
      cropName: "Wheat",
      farmerName: "Amit Singh",
      quantity: 200,
      rate: 35,
    },
  ];

const filteredCrops = crops.filter((crop) => {
  const matchesSearch = crop.cropName
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesPrice =
    maxPrice === "" || crop.rate <= Number(maxPrice);

  const matchesQuantity =
    minQuantity === "" || crop.quantity >= Number(minQuantity);

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
    placeholder="Search crops..."
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


  <div className="crop-list">
  {filteredCrops.length > 0 ? (
    filteredCrops.map((crop) => (
      <div className="crop-card" key={crop.id}>
        <h3>{crop.cropName}</h3>

        <p>
          <strong>Farmer:</strong> {crop.farmerName}
        </p>

        <p>
          <strong>Quantity:</strong> {crop.quantity} kg
        </p>

        <p>
          <strong>Rate:</strong> ₹{crop.rate}/kg
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






        <div className="crop-grid">
          {filteredCrops.map((crop) => (
            <div className="crop-card" key={crop.id}>
              <h3>{crop.cropName}</h3>

              <p>
                <strong>Farmer:</strong> {crop.farmerName}
              </p>

              <p>
                <strong>Quantity:</strong> {crop.quantity} kg
              </p>

              <p>
                <strong>Rate:</strong> ₹{crop.rate}/kg
              </p>

              <button>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;