import React, { useEffect, useState } from "react";
import { Search, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Customer fetch error:", err);
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      alert("Customer deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete customer");
    }
  };

  const filtered = customers.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(query.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p style={{ padding: 20 }}>Loading customers...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <h2>Customers</h2>
          <div className="muted">Manage your loyalty program customers</div>
        </div>
        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Plus size={16} /> Add Customer
        </button>
      </div>

      <div className="search" style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <Search size={18} style={{ marginRight: 8, color: "#6b7280" }} />
        <input
          style={{ border: "none", outline: "none", width: "100%" }}
          placeholder="Search customers by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="customers-table" style={{ marginTop: 20 }}>
        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>CUSTOMER</th>
              <th>PHONE</th>
              <th>POINTS EARNED</th>
              <th>POINTS REDEEMED</th>
              <th>CURRENT BALANCE</th>
              <th>STATUS</th>
              <th>JOIN DATE</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s, idx) => (
                <tr key={s._id || idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{s.name || "-"}</div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {s.email || "-"}
                    </div>
                  </td>
                  <td>{s.phone || "-"}</td>
                  <td style={{ color: "#10b981", fontWeight: 700 }}>+{(s.earned ?? 0).toLocaleString()}</td>
                  <td style={{ color: "#ef4444", fontWeight: 700 }}>-{(s.redeemed ?? 0).toLocaleString()}</td>
                  <td style={{ fontWeight: 800 }}>{s.balance ?? 0} pts</td>
                  <td>
                    <span
                      className="status-pill"
                      style={{
                        background: "#d1fae5",
                        color: "#065f46",
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 13,
                      }}
                    >
                      {s.status || "Active"}
                    </span>
                  </td>
                  <td>{s.join || "-"}</td>
                  <td style={{ textAlign: "right", position: "relative" }}>
                    <div
                      className="actions"
                      style={{ display: "flex", gap: 6, justifyContent: "flex-end", position: "relative" }}
                    >
                      <Pencil size={16} style={{ cursor: "pointer" }} />
                      <div style={{ position: "relative" }}>
                        <MoreVertical
                          size={16}
                          style={{ cursor: "pointer" }}
                          onClick={() => setOpenMenu(openMenu === s._id ? null : s._id)}
                        />
                        {openMenu === s._id && (
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: "24px",
                              background: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: 8,
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              zIndex: 10,
                            }}
                          >
                            <button
                              onClick={() => handleDelete(s._id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 12px",
                                width: "100%",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#dc2626",
                              }}
                            >
                              <Trash2 size={15} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
