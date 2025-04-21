import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API_BASE_URL from "../config";
import "../App.css";

const RateUser = () => {
  const [usersToRate, setUsersToRate] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`${API_BASE_URL}/api/ratings/partners/${userId}`)
        .then((res) => res.json())
        .then((data) => setUsersToRate(data))
        .catch((err) => console.error("Failed to load users to rate:", err));
    }
  }, []);

  const handleRate = async (ratedUserId, rating) => {
    const res = await fetch(`${API_BASE_URL}/api/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rater_id: sessionStorage.getItem("userId"),
        rated_id: ratedUserId,
        rating: rating,
      }),
    });

    if (res.ok) {
      alert("Rating submitted!");
    } else {
      alert("Failed to submit rating.");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="rate-user-wrapper">
        <h2>Rate Other Users</h2>
        {usersToRate.length === 0 ? (
          <p>No users to rate yet.</p>
        ) : (
          usersToRate.map((user) => (
            <div className="rate-card" key={user.id}>
              <h4>{user.username}</h4>
              <p>{user.email}</p>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => handleRate(user.id, n)}>
                    {n}⭐
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RateUser;

