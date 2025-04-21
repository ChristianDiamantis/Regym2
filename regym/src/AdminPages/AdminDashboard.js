import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API_BASE_URL from "../config";
import "../App.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, listings: 0, reports: 0 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="admin-dashboard-wrapper">
        <h2>Admin Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card"><h3>Users</h3><p>{stats.users}</p></div>
          <div className="stat-card"><h3>Listings</h3><p>{stats.listings}</p></div>
          <div className="stat-card"><h3>Reports</h3><p>{stats.reports}</p></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
