import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";
import API_BASE_URL from "../config";

const ViewListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`${API_BASE_URL}/api/listings/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setListings(data))
        .catch((err) => console.error("Failed to fetch listings:", err));
    }
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const res = await fetch(`${API_BASE_URL}/api/listings/${id}`, { method: "DELETE" });
      if (res.ok) setListings(listings.filter((item) => item.id !== id));
      else alert("Failed to delete listing.");
    }
  };

  const handleEdit = (id) => {
    alert("Edit page not set up yet — you can route to /edit-listing/" + id);
  };

  return (
    <div>
      <Navbar />
      <main className="view-listings-wrapper">
        <h2>Your Listings</h2>
        {listings.length === 0 ? (
          <p className="empty-list">You haven't posted any listings yet.</p>
        ) : (
          <div className="listings-grid">
            {listings.map((item) => (
              <div className="listing-card" key={item.id}>
                <img src={item.image || "https://via.placeholder.com/300x200"} alt={item.title} />
                <h4>{item.title}</h4>
                <p><strong>Condition:</strong> {item.condition}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <div className="listing-actions">
                  <button onClick={() => handleEdit(item.id)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ViewListings;

