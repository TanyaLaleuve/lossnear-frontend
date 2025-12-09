"use client";
import { useEffect, useState } from "react";
import ServerList from "../components/dashboard/ServerList";

const SIDEBAR_WIDTH = 75;

export default function DashboardShell({ children }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let startX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
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

  return (
    <div className="dashboard-shell">
      <div
        className={`dashboard-shell-sidebar ${open ? "" : "closed"}`}
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <ServerList />
      </div>
      <div
        className="dashboard-shell-content"
        style={{ marginLeft: open ? 0 : `-${SIDEBAR_WIDTH}px` }}
      >
        <button className="dashboard-shell-toggle" onClick={handleToggle} >
          {open ? "|<" : "|>"}
        </button>
        {children}
      </div>
    </div>
  );
}
