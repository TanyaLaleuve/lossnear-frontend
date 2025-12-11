"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaHome, FaSync } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarServerList({ onLoadingChange }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const SWIPE_THRESHOLD = 60;
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
    };

    const handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startXRef.current;
      const deltaY = touch.clientY - startYRef.current;

      // Ignore mostly vertical gestures to avoid breaking scroll
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      if (isOpen && deltaX < -SWIPE_THRESHOLD) {
        setIsOpen(false);
      } else if (!isOpen && startXRef.current < 60 && deltaX > SWIPE_THRESHOLD) {
        // Only listen for the "open" swipe starting near the left edge
        setIsOpen(true);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  // Afficher la liste des serveurs de l'utilisateur
  const [loading, setLoading] = useState(true);
  const [guilds, setGuilds] = useState([]);

  const pathSegments = pathname.split("/");
  const isServerRoute =
    pathSegments[1] === "dashboard" && pathSegments[2] === "server" && pathSegments[3];
  const currentServerId = isServerRoute ? pathSegments[3] : null;
  const suffix = isServerRoute ? pathSegments.slice(4).join("/") : "";
  //Fetch les serveurs depuis l'API et les afficher ici
  async function loadGuilds() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch("/api/mock/guilds");
    const json = await response.json();

    setGuilds(json.data);
    setLoading(false);
  }

  // --------------------------
  // ĐY"¾ Chargement initial
  // --------------------------
  useEffect(() => {
    loadGuilds();
  }, []);

  useEffect(() => {
    if (typeof onLoadingChange === "function") {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  function reloadAll() {
    loadGuilds();
  }

  return (
    <div className="dashboard-layout-sidebar">
      <button className="btn-icon icon-sidebar sidebar-rl-btn" onClick={reloadAll}>
        <FaSync />
      </button>
      <button
        className="btn-icon icon-sidebar sidebar-home-btn"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <FaHome />
      </button>

      <div className="server-list-container">
        {/* Liste des serveurs de l'utilisateur */}

        {/* ---------------------- */}
        {/* ƒ?ü Skeleton loading   */}
        {/* ---------------------- */}
        {loading && (
          <div className="server-list server-list-skeleton">
            {[1, 2, 3].map((i) => (
              <div key={i} className="server-icon skeleton-server-icon"></div>
            ))}
          </div>
        )}
        {!loading && (
          <div className="server-list">
            {guilds.map((g) => {
              const target = suffix
                ? `/dashboard/server/${g.id}/${suffix}`
                : `/dashboard/server/${g.id}`;
              const isSelected = currentServerId === g.id;

              return (
                <button
                  key={g.id}
                  className={`server-icon selected-server-icon ${
                    isSelected ? "sidebar-server-selected" : ""
                  }`}
                  title={g.name}
                  onClick={() => {
                    router.push(target);
                  }}
                >
                  <img src={`/icons/${g.icon}.png`} alt={g.name} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
