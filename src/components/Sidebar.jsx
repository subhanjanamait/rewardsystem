import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Activity , Sparkles} from "lucide-react";

export default function Sidebar() {
  const items = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { key: "customers", label: "Customers", path: "/customers", icon: <Users size={18} /> },
    { key: "activity", label: "Activity", path: "/activity", icon: <Activity size={18} /> },
    { key: "rules", label: "Rules", path: "/rules", icon: <Sparkles size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="logo-mark">R</div>
          <div>
            <div className="brand-name">Rewardsys</div>
            <div className="brand-sub">Loyalty System</div>
          </div>
        </div>
        <nav className="menu">
          {items.map((it) => (
            <NavLink
              key={it.key}
              to={it.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <span className="icon">{it.icon}</span>
              <span>{it.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="footer">Version 1.0</div>
    </aside>
  );
}
