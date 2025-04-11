"use client";
import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    console.log("Dashboard Loaded");
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2"
      >
        Tes Logout
      </button>
    </div>
  );
}
