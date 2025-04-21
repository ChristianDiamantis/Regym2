import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API_BASE_URL from "../config";
import "../App.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`${API_BASE_URL}/api/favorites/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch((err) => console.error("Failed to load favorites:", err));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main className="favorites-wrapper">
        <h2>Your Favorites</h2>
        <div className="item-grid">
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            favorites.map((item) => (
              <div className="item-card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
