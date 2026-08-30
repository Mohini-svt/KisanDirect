import { useParams, useNavigate } from "react-router-dom";
import "./CropDetails.css";

function CropDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const crops = [
    {
      id: "1",
      cropName: "Potato",
      farmerName: "Ramesh Kumar",
      quantity: 100,
      rate: 25,
      location: "Muzaffarpur",
      description: "Fresh quality potatoes directly supplied by the farmer.",
    },
    {
      id: "2",
      cropName: "Tomato",
      farmerName: "Suresh Patel",
      quantity: 80,
      rate: 30,
      location: "Patna",
      description: "Fresh and organically grown tomatoes.",
    },
    {
      id: "3",
      cropName: "Wheat",
      farmerName: "Amit Singh",
      quantity: 200,
      rate: 35,
      location: "Darbhanga",
      description: "High quality wheat harvested this season.",
    },
  ];

  const crop = crops.find((item) => item.id === id);

  if (!crop) {
    return (
      <div className="crop-details">
        <div className="crop-details-card">
          <h1>Crop Not Found</h1>
          <button onClick={() => navigate("/buyer")}>
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    alert(`Order placed successfully for ${crop.cropName}!`);
  };

  return (
    <div className="crop-details">
      <div className="crop-details-card">

        <button
          className="back-button"
          onClick={() => navigate("/buyer")}
        >
          ← Back to Marketplace
        </button>

        <h1>{crop.cropName}</h1>

        <div className="crop-info">
          <p>
            <strong>Farmer:</strong> {crop.farmerName}
          </p>

          <p>
            <strong>Available Quantity:</strong> {crop.quantity} kg
          </p>

          <p>
            <strong>Price:</strong> ₹{crop.rate}/kg
          </p>

          <p>
            <strong>Location:</strong> {crop.location}
          </p>

          <p>
            <strong>Description:</strong> {crop.description}
          </p>
        </div>

        <div className="order-section">
          <h3>Place Your Order</h3>

          <label>Enter Quantity (kg)</label>

          <input
            type="number"
            placeholder="Enter quantity"
            min="1"
            max={crop.quantity}
          />

          <button onClick={handleOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default CropDetails;