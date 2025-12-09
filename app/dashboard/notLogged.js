"use client";
import { useState } from "react";
import LoginModal from "../components/modals/LoginModal";
import { useAuth } from "../context/AuthContext";
export default function NotLogged() {
  const { user } = useAuth(); 
  const [showLoginModal, setShowLoginModal] = useState(true);
  return (
    <>
      {!user && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
          }}
        />
      )}
      <div className="global-wrapper">
        <main className="dashboard-main">
            <h1 className="lossnear-gradient">PAS CO</h1>
            <p>Vous devez être connecté pour accéder au dashboard.</p>
            <button onClick={() => setShowLoginModal(true)}>Se connecter</button>
        </main>
      </div>
    </>
  );
}
