"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function ServerList() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const startXRef = useRef(0);
  const startYRef = useRef(0);

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

  if(!user) {
    return null;
  }
    return ( 
            <div className="dashboard-layout-sidebar">
                  <button className="sidebar-home-btn" onClick={() => {
                    window.location.href = "/dashboard";
                  }}><FaHome/></button>
                  <div className="server-list">
                  </div>
            </div>
              
    );
}
