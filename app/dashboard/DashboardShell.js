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
  const [lastRecent, setLastRecent] = useState(null); // dernier panneau touché (open/close): 't1' ou 't2'
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const { user } = useAuth();
  const userRef = useRef(null);

  // Ferme tout si déconnexion.
  useEffect(() => {
    userRef.current = user;
    if (!user) {
      setOpen(false);
      setOpen_t2(false);
      setLastRecent(null);
    }
  }, [user]);

  // Gestuelle swipe et logique unifiée d'ouverture/fermeture
  useEffect(() => {
    let startX = 0;

    const openT1 = () => {
      setOpen(true);
      setLastRecent("t1");
    };
    const openT2 = () => {
      setOpen_t2(true);
      setLastRecent("t2");
    };
    const closeT1 = () => {
      setOpen(false);
      setLastRecent("t1");
    };
    const closeT2 = () => {
      setOpen_t2(false);
      setLastRecent("t2");
    };

    // Ouvre en priorité le dernier fermé (ou l'autre si l'un est déjà ouvert)
    const doOpen = () => {
      if (isHome) {
        if (!open) openT1();
        return;
      }
      if (open && !open_t2) {
        openT2();
        return;
      }
      if (open_t2 && !open) {
        openT1();
        return;
      }
      if (!open && !open_t2) {
        if (lastRecent === "t2") openT2();
        else if (lastRecent === "t1") openT1();
        else openT1();
      }
    };

    // Ferme en priorité le dernier ouvert
    const doClose = () => {
      if (isHome) {
        if (open) closeT1();
        return;
      }
      if (open && open_t2) {
        if (lastRecent === "t2") closeT2();
        else closeT1();
        return;
      }
      if (open) closeT1();
      else if (open_t2) closeT2();
    };

    const handleSwipeLeft = () => {
      doClose();
    };

    const handleSwipeRight = () => {
      doOpen();
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
  }, [open, open_t2, lastRecent, isHome]);

  // Toggles utilisent la même logique (ouverture/fermeture) que les swipes
  const handleToggle = () => {
    if (open) {
      setOpen(false);
      setLastRecent(open_t2 ? "t2" : null);
    } else {
      if (open_t2) {
        // si T2 est déjà ouverte et on toggle T1, on ouvre T1 sans fermer T2
        setOpen(true);
        setLastRecent("t1");
      } else {
        setOpen(true);
        setLastRecent("t1");
      }
    }
  };

  const handleToggle_t2 = () => {
    if (open_t2) {
      setOpen_t2(false);
      setLastRecent(open ? "t1" : null);
    } else {
      if (open) {
        setOpen_t2(true);
        setLastRecent("t2");
      } else {
        setOpen_t2(true);
        setLastRecent("t2");
      }
    }
  };

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

          <button className={`dashboard-shell-toggle ${open? "open":""}`} onClick={handleToggle}>
            {open ? "|<" : "|>"}
          </button>
          {!isHome &&(<button className={`dashboard-shell-toggle-2 ${open_t2? "open":""}`} onClick={handleToggle_t2}>
            {open ? "|<" : "|>"}
          </button>)}

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
