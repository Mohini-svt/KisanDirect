import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

function FarmerDashboard() {
  const navigate = useNavigate();
  const [farmerName, setFarmerName] = useState("");
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [crops, setCrops] = useState([]);
  

  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [voiceLang, setVoiceLang] = useState("en-IN"); // "en-IN" or "hi-IN"

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
      farmer_name : farmerName,
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
        alert("Crop added to Database successfully!");
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

  // ---------- Voice guidance (browser-only, no AI/API calls) ----------

  const isVoiceSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) &&
    "speechSynthesis" in window;

  // Prompt text for each supported language, keyed by voiceLang
  const prompts = {
    "en-IN": {
      askName: "Let's add your crop. What is your name?",
      gotName: (name) => `Got it, ${name}.`,
      askCrop: "What crop do you want to add?",
      gotCrop: (crop) => `${crop}. Noted.`,
      askQty: "How many kilograms do you have?",
      gotQty: (qty) => `${qty} kilograms.`,
      skipQty: "Skipping quantity for now.",
      askRate: "What is the rate per kilogram, in rupees?",
      gotRate: (rate) => `${rate} rupees per kilogram. Adding your crop now.`,
      skipRate: "Skipping rate for now.",
      noNumber: "I didn't catch a number. Please say it again.",
      done: "Your crop has been added to the stock list.",
      partial:
        "I've filled in what I could hear. Please check the form and tap Add Crop to Stock to finish.",
      error: "Something went wrong with voice input. Please fill the form manually.",
      unsupported:
        "Voice guide needs Google Chrome or Microsoft Edge to work. Please try in one of those browsers.",
    },
    "hi-IN": {
      askName: "अपनी फसल जोड़ते हैं। आपका नाम क्या है?",
      gotName: (name) => `ठीक है, ${name}.`,
      askCrop: "आप कौन सी फसल जोड़ना चाहते हैं?",
      gotCrop: (crop) => `${crop}. नोट कर लिया गया है।`,
      askQty: "आपके पास कितने किलोग्राम है?",
      gotQty: (qty) => `${qty} किलोग्राम।`,
      skipQty: "मात्रा फिलहाल छोड़ रहे हैं।",
      askRate: "प्रति किलोग्राम दर क्या है, रुपयों में?",
      gotRate: (rate) => `${rate} रुपये प्रति किलोग्राम। आपकी फसल जोड़ी जा रही है।`,
      skipRate: "दर फिलहाल छोड़ रहे हैं।",
      noNumber: "मुझे कोई संख्या समझ नहीं आई। कृपया फिर से बोलें।",
      done: "आपकी फसल स्टॉक सूची में जोड़ दी गई है।",
      partial:
        "मैंने जो सुना वह भर दिया है। कृपया फॉर्म जांचें और Add Crop to Stock दबाएं।",
      error: "आवाज़ इनपुट में कुछ गड़बड़ी हुई। कृपया फॉर्म खुद भरें।",
      unsupported:
        "वॉइस गाइड के लिए Google Chrome या Microsoft Edge चाहिए। कृपया इनमें से किसी एक ब्राउज़र में खोलें।",
    },
  };

  // Speaks a line and resolves once the browser finishes saying it
  const speak = (text) => {
    setVoiceStatus(text);
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceLang;
      utterance.rate = 0.95;
      utterance.onend = resolve;
      utterance.onerror = resolve; // never hang the flow on a TTS glitch
      window.speechSynthesis.speak(utterance);
    });
  };

  // Listens for one spoken answer and resolves with the transcript
  const listenOnce = () => {
    setVoiceStatus("Listening...");
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        resolve(event.results[0][0].transcript.trim());
      };
      recognition.onerror = (event) => {
        console.error("SpeechRecognition error:", event.error);
        reject(event.error);
      };
      recognition.onspeechend = () => recognition.stop();

      recognition.start();
    });
  };

  // Converts Devanagari digits (०-९) to Latin digits (0-9) so numeric
  // parsing works regardless of how Chrome transcribes spoken numbers
  const devanagariToLatin = (str) =>
    str.replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));

  const extractNumber = (text) => {
    const normalized = devanagariToLatin(text.replace(/,/g, ""));
    const match = normalized.match(/\d+(\.\d+)?/);
    return match ? match[0] : "";
  };

  // Asks a numeric question, retries once if no number was understood
  const listenForNumber = async (promptText, retries = 1) => {
    await speak(promptText);
    const text = await listenOnce();
    const num = extractNumber(text);
    if (!num && retries > 0) {
      return listenForNumber(prompts[voiceLang].noNumber, retries - 1);
    }
    return num;
  };

  const startVoiceGuide = async () => {
    if (!isVoiceSupported) {
      alert(prompts[voiceLang].unsupported);
      return;
    }

    setVoiceActive(true);
    const t = prompts[voiceLang];

    try {
      await speak(t.askName);
      const name = await listenOnce();
      setFarmerName(name);
      await speak(t.gotName(name));

      await speak(t.askCrop);
      const crop = await listenOnce();
      setCropName(crop);
      await speak(t.gotCrop(crop));

      const qty = await listenForNumber(t.askQty);
      if (qty) setQuantity(qty);
      await speak(qty ? t.gotQty(qty) : t.skipQty);

      const rateVal = await listenForNumber(t.askRate);
      if (rateVal) setRate(rateVal);
      await speak(rateVal ? t.gotRate(rateVal) : t.skipRate);

      if (name && crop && qty && rateVal) {
        const newCrop = {
          id: Date.now(),
          farmerName: name,
          cropName: crop,
          quantity: qty,
          rate: rateVal,
        };
        setCrops((prev) => [...prev, newCrop]);
        setFarmerName("");
        setCropName("");
        setQuantity("");
        setRate("");
        await speak(t.done);
      } else {
        await speak(t.partial);
      }
    } catch (err) {
      console.error("Voice guide error:", err);
      await speak(t.error);
    } finally {
      setVoiceActive(false);
      setVoiceStatus("");
    }
  };

  return (
    <div className="farmer-dashboard">
    
        <div className="dashboard-header">
        <h1>🌱 KisanDirect Farmer Dashboard</h1>

      <button
        className="home-button"
        onClick={() => navigate("/")}
              >
          ← Home
      </button>
    </div>




      <div className="dashboard-container">
        <div className="add-crop-section">
          <h2>🌱 Add Your Crop</h2>

          <div className="lang-toggle">
            <button
              type="button"
              onClick={() => setVoiceLang("en-IN")}
              disabled={voiceLang === "en-IN" || voiceActive}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setVoiceLang("hi-IN")}
              disabled={voiceLang === "hi-IN" || voiceActive}
            >
              हिंदी
            </button>
          </div>

          <button
            type="button"
            className={`voice-guide-btn ${voiceActive ? "listening" : ""}`}
            onClick={startVoiceGuide}
            disabled={voiceActive}
          >
            🎙️ {voiceActive ? "Listening..." : "Fill by Voice"}
          </button>

          {voiceActive && (
            <p className="voice-status" aria-live="polite">
              {voiceStatus}
            </p>
          )}

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
                    <td>{crop.farmer_name}</td>
                    <td>{crop.name || crop.cropname}</td>
                    <td>{crop.quantity}kg</td>
                    <td>₹{crop.price_per_kg}/kg</td>
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