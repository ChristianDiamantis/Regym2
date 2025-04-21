import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";
import API_BASE_URL from "../config";

const Users = () => {
  const [users, setUsers] = useState([]);

  // 🔄 Load users from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  // 🚫 Ban/delete user
  const banUser = async (id) => {
    const confirmBan = window.confirm("Are you sure you want to ban/delete this user?");
    if (confirmBan) {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted.");
      } else {
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <main className="favorites-wrapper">
        <h2>All Registered Users</h2>
        <div className="favorites-grid">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div className="favorite-card" key={user.id}>
                <h4>{user.username || user.name}</h4>
                <p>Email: {user.email}</p>
                <button className="remove-btn" onClick={() => banUser(user.id)}>
                  Ban/Delete User
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

export default Users;
