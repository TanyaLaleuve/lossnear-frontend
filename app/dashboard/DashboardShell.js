"use client";
import { useEffect, useRef, useState } from "react";
import SidebarServerList from "../components/dashboard/Sidebar-ServerList";
import { useAuth } from "../context/AuthContext";
import NotLogged from "./notLogged";
const SIDEBAR_WIDTH = 75;

export default function DashboardShell({ children }) {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const userRef = useRef(null);

  useEffect(() => {
    const prevUser = userRef.current;
    userRef.current = user;
    if (!user) {
      // Ferme le panneau dès qu'on se déconnecte
      setOpen(false);
    } else if (user && !prevUser) {
      // Ouvre par défaut à la connexion
      setOpen(true);
    }
  }, [user]);

  useEffect(() => {

      let startX = 0;

      const onTouchStart = (e) => {
        if (!userRef.current) return;
        startX = e.touches[0].clientX;
      };

      const onTouchEnd = (e) => {
        if (!userRef.current) return;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (diff < -40) setOpen(false);
        if (diff > 40) setOpen(true);
      };

        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        return () => {
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchend", onTouchEnd);
        };
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  if (!user) {
    return <NotLogged />;
  }

  return (
    <div className="dashboard-shell">
      <div
        className={`dashboard-shell-sidebar ${open ? "" : "closed"}`}
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <SidebarServerList />
      </div>

      <div
        className="dashboard-shell-content"
        style={{ marginLeft: open ? 0 : `-${SIDEBAR_WIDTH}px` }}
      >
        <button className="dashboard-shell-toggle" onClick={handleToggle}>
          {open ? "|<" : "|>"}
        </button>
        {children}
      </div>
    </div>
  );
}
