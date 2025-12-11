"use client";
import NotLogged from "./notLogged";
import { useAuth } from "@/app/context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();

  if (!user) {
    return <NotLogged />;
  }
  return (
    <div className="global-wrapper">
      <main className="dashboard-main">
        <h1 className="lossnear-gradient">Dashboard</h1>
      </main>
    </div>
  );
}
