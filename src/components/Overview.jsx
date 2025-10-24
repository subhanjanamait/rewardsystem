import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPointsEarned: 0,
    totalPointsRedeemed: 0,
    totalSales: 0,
    newCustomersToday: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading dashboard...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="muted">Overview of loyalty program performance</div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        <div className="card">
          <h4>Total Customers</h4>
          <div className="value">{stats.totalCustomers?.toLocaleString() || 0}</div>
        </div>
        <div className="card">
          <h4>Points Earned</h4>
          <div className="value">{stats.totalPointsEarned?.toLocaleString() || 0}</div>
        </div>
        <div className="card">
          <h4>Points Redeemed</h4>
          <div className="value">{stats.totalPointsRedeemed?.toLocaleString() || 0}</div>
        </div>
        <div className="card">
          <h4>Total Sales</h4>
          <div className="value">${stats.totalSales?.toLocaleString() || 0}</div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>Recent Activity</h3>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginTop: 10,
          }}
        >
          <div className="card small">
            <h4>New Customers Today</h4>
            <div className="value">{stats.newCustomersToday || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
