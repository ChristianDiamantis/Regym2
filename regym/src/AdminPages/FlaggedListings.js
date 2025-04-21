import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";
import API_BASE_URL from "../config";

const FlaggedListings = () => {
  const [flagged, setFlagged] = useState([]);

  // 🔄 Load flagged listings from the database
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/flagged`)
      .then((res) => res.json())
      .then((data) => setFlagged(data))
      .catch((err) => console.error("Error loading flagged listings:", err));
  }, []);

  // 🗑️ Remove listing from DB
  const removeListing = async (id) => {
    const confirm = window.confirm("Remove this flagged listing?");
    if (confirm) {
      const res = await fetch(`${API_BASE_URL}/api/admin/flagged/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFlagged(flagged.filter((item) => item.id !== id));
      } else {
        alert("Failed to remove listing.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <main className="favorites-wrapper">
        <h2>Flagged Listings</h2>
        <div className="favorites-grid">
          {flagged.length === 0 ? (
            <p>No flagged listings found.</p>
          ) : (
            flagged.map((item) => (
              <div className="favorite-card" key={item.id}>
                <img src={item.image || "https://via.placeholder.com/300x200"} alt={item.title} />
                <h4>{item.title}</h4>
                <p><strong>Issue:</strong> {item.reason || "Flagged by user(s)"}</p>
                <button className="remove-btn" onClick={() => removeListing(item.id)}>
                  Remove Listing
                </button>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlaggedListings;
