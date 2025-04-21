import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import "../App.css";
import API_BASE_URL from "../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`${API_BASE_URL}/api/listings/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setListings(data))
        .catch((err) => console.error("Error fetching listings:", err));
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
          <h3>Quick Panel</h3>
          <button onClick={() => navigate("/create-listing")}>Create Listing</button>
          <button onClick={() => navigate("/view-listings")}>View Listings</button>
          <button onClick={() => navigate("/cart")}>Cart</button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Top Right Buttons */}
          <div className="dashboard-topbar">
            <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
            <button onClick={() => navigate("/filter")}>Filter</button>
          </div>

          <h2>Welcome to Your Dashboard</h2>

          {/* Item Grid */}
          <div className="item-grid">
            {listings.length > 0 ? (
              listings.map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="image-placeholder">
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      "No Image"
                    )}
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p><strong>Condition:</strong> {item.condition}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <div className="item-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="buy-btn">Buy</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No listings found. Create one now!</p>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
