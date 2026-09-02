import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CropDetails.css";

function CropDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/crops/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Crop details not found");
        }
        return res.json();
      })
      .then((data) => {
        setCrop(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching crop details:", err);
        setError("Failed to load crop details.");
        setLoading(false);
      });
  }, [id]);

  const handleOrder = () => {
    alert(`Order placed successfully for ${crop.name || crop.cropName}!`);
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading crop details...</h2>;
  }

  if (error || !crop) {
    return (
      <div className="crop-details">
        <div className="crop-details-card">
          <h1>Crop Not Found</h1>
          <button className="back-button" onClick={() => navigate("/buyer")}>
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="crop-details">
      <div className="crop-details-card">
        <button className="back-button" onClick={() => navigate("/buyer")}>
          ← Back to Marketplace
        </button>

        <h1>{crop.name || crop.cropName}</h1>

        <div className="crop-info">
          <p>
            <strong>Farmer: </strong>
            {crop.farmer_name || "Unknown Farmer"}
          </p>
          <p>
            <strong>Available Quantity: </strong>
            {crop.quantity} kg
          </p>
          <p>
            <strong>Price: </strong>
            ₹{crop.price_per_kg || crop.price || crop.rate}/kg
          </p>
          {crop.location && (
            <p>
              <strong>Location: </strong>
              {crop.location}
            </p>
          )}
          {crop.description && (
            <p>
              <strong>Description: </strong>
              {crop.description}
            </p>
          )}
        </div>

        <div className="order-section">
          <h3>Place Your Order</h3>
          <label>Enter Quantity (kg)</label>
          <input
            type="number"
            placeholder="Enter quantity"
            min="1"
            max={crop.quantity}
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
          />
          <button onClick={handleOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default CropDetails;