"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarServerList from "../components/dashboard/Sidebar-ServerList";
import SidebarModules from "../components/dashboard/SidebarModules";
import { useAuth } from "../context/AuthContext";
import { SidebarProvider } from "../context/SidebarContext";
import NotLogged from "./notLogged";

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/dashboard";

  const [open, setOpen] = useState(false);
  const [open_t2, setOpen_t2] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const { user } = useAuth();
  const userRef = useRef(null);

  // Ferme tout si déconnexion. Sinon on garde l'état courant (défini par useState).
  useEffect(() => {
    userRef.current = user;
    if (!user) {
      setOpen(false);
      setOpen_t2(false);
    }
  }, [user]);

  // Gestuelle swipe
  useEffect(() => {
    let startX = 0;

    const handleSwipeLeft = () => {
      if (isHome) {
        if (open) setOpen(false); // seulement T1 sur home
        return;
      }
      if (open) setOpen(false);
      else if (open_t2) setOpen_t2(false);
    };

    const handleSwipeRight = () => {
      if (isHome) {
        if (!open) setOpen(true); // seulement T1 sur home
        return;
      }
      if (!open_t2) setOpen_t2(true);
      else if (!open) setOpen(true);
    };

    const onTouchStart = (e) => {
      if (!userRef.current) return;
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      if (!userRef.current) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff < -40) handleSwipeLeft();
      if (diff > 40) handleSwipeRight();
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, open_t2, isHome]);

  const handleToggle = () => setOpen((prev) => !prev);

  if (!user) {
    return <NotLogged />;
  }

  return (
    <SidebarProvider
      value={{
        open,
        setOpen,
        openT2: open_t2,
        setOpenT2: setOpen_t2,
      }}
    >
      <div className="dashboard-shell">
        {/* Sidebar T1 : serveurs */}
        <aside className={`dashboard-shell-sidebar ${open ? "" : "closed"}`}>
          <SidebarServerList onLoadingChange={setSidebarLoading} />
        </aside>

        <div
          className={`dashboard-shell-content ${sidebarLoading ? "dashboard-shell-content-loading" : ""}`}
        >
          {sidebarLoading && (
            <div className="dashboard-shell-loading-overlay">
              <div className="dashboard-shell-loading-spinner">
                <div className="spinner" />
                <p>Chargement des serveurs...</p>
              </div>
            </div>
          )}

          <button className="dashboard-shell-toggle" onClick={handleToggle}>
            {open ? "|<" : "|>"}
          </button>

          <div className={`dashboard-shell-body ${sidebarLoading ? "dashboard-shell-body-blur" : ""}`}>
            {/* Sidebar T2 : modules */}
            <aside className={`dashboard-shell-sidebar-t2 ${open_t2 ? "" : "closed"}`}>
              <SidebarModules onLoadingChange={setSidebarLoading} />
            </aside>

            <div className="dashboard-shell-main">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
