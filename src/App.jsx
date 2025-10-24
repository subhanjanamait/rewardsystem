import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Customers from "./components/Customers";
import ActivityLog from "./components/ActivityLog"; 
import Rules from "./components/Rules";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/activity"  element={<ActivityLog />} />
            <Route path="/rules" element={<Rules />} />
            {/* Default redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
