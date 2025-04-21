import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";
import API_BASE_URL from "../config";

const Reports = () => {
  const [reports, setReports] = useState([]);

  // 🔄 Load reports on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/reports`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Failed to fetch reports:", err));
  }, []);

  // ❌ Dismiss a report
  const dismissReport = async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/reports/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setReports(reports.filter((r) => r.id !== id));
    } else {
      alert("Failed to dismiss report.");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="favorites-wrapper">
        <h2>User Reports</h2>
        <div className="favorites-grid">
          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            reports.map((report) => (
              <div className="favorite-card" key={report.id}>
                <h4>{report.item}</h4>
                <p><strong>Reported by:</strong> {report.reporter}</p>
                <p><strong>Reason:</strong> {report.reason}</p>
                <button className="remove-btn" onClick={() => dismissReport(report.id)}>
                  Dismiss Report
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

export default Reports;
