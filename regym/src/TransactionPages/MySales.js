import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API_BASE_URL from "../config";
import "../App.css";

const MySales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`${API_BASE_URL}/api/listings/sold/${userId}`)
        .then((res) => res.json())
        .then((data) => setSales(data))
        .catch((err) => console.error("Failed to load sales:", err));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main className="mysales-wrapper">
        <h2>Items You've Sold</h2>
        <div className="item-grid">
          {sales.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            sales.map((item) => (
              <div className="item-card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p><strong>Sold for:</strong> ${item.price}</p>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MySales;
