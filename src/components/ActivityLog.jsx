import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Download } from "lucide-react";

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/transactions")
      .then((res) => {
        setActivities(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Activity log fetch error:", err);
        setError("Failed to load activity log");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filteredData = activities.filter(
      (a) =>
        a.customerName?.toLowerCase().includes(term) ||
        a.email?.toLowerCase().includes(term) ||
        a.description?.toLowerCase().includes(term) // description might be missing, verify backend
    );
    setFiltered(filteredData);
  };

  if (loading) return <div style={{ padding: 20 }}>Loading activity log...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  // Styles etc. remain unchanged — omitted here for brevity

  return (
    <div style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "#111827" }}>Activity Log</h2>
          <p style={{ color: "#6b7280", fontSize: 13 }}>Track all customer point transactions</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #d1d5db", color: "#374151", background: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
            <Filter size={18} /> Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #d1d5db", color: "#374151", background: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{ position: "absolute", left: 10, top: 10, color: "#9ca3af" }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, email, or description..."
            style={{ width: "100%", padding: "8px 12px 8px 36px", border: "1px solid #d1d5db", borderRadius: 8, outline: "none" }}
          />
        </div>
        <button onClick={handleSearch} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #d1d5db", color: "#374151", background: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
          <Search size={16} /> Search
        </button>
      </div>

      <div style={{ overflowY: "auto", maxHeight: "65vh", backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6", position: "sticky", top: 0, zIndex: 2 }}>S.No</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>CUSTOMER</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>ACTION</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>POINTS</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>DESCRIPTION</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>ORDER ID</th>
              <th style={{ padding: 12, fontWeight: 600, fontSize: 14, textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f3f4f6" }}>DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a, idx) => (
                <tr
                  key={idx}
                  style={{ transition: "background 0.2s", cursor: "default" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ padding: 12, fontSize: 14, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>{idx + 1}</td>

                  <td style={{ padding: 12, fontSize: 14, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ fontWeight: 500, color: "#111827" }}>{a.customerName || "Unknown"}</div>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>{a.email || "-"}</div>
                  </td>

                  <td style={{ padding: 12, fontSize: 14, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: "9999px",
                        backgroundColor: a.action === "Earned" ? "#d1fae5" : a.action === "Redeemed" ? "#fee2e2" : "#e5e7eb",
                        color: a.action === "Earned" ? "#065f46" : a.action === "Redeemed" ? "#b91c1c" : "#374151",
                      }}
                    >
                      {a.action || "N/A"}
                    </span>
                  </td>

                  <td style={{ padding: 12, fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>
                    {a.action === "Earned"
                      ? `+${Math.abs(a.points)} pts`
                      : a.action === "Redeemed"
                      ? `-${Math.abs(a.points)} pts`
                      : `${a.points || 0} pts`}
                  </td>

                  <td style={{ padding: 12, fontSize: 14, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>{a.description || "—"}</td>

                  <td style={{ padding: 12, fontSize: 14, color: "#2563eb", borderBottom: "1px solid #f3f4f6" }}>{a.orderId ? `#${a.orderId}` : "-"}</td>

                  <td style={{ padding: 12, fontSize: 14, color: "#4b5563", borderBottom: "1px solid #f3f4f6" }}>{a.date || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
                  No activity found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
