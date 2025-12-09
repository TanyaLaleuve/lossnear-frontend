"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./modals/LoginModal";
import { useAuth } from "../context/AuthContext";
import DefaultAvatar from "./DefaultAvatar";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(0);
    useEffect(() => {
        // Initialise avec la position actuelle
        lastScroll.current = window.scrollY;

        const handleScroll = () => {
            if (open) return;
            const currentScroll = window.scrollY;

            // Toujours afficher la navbar en haut de page (gère l'overscroll bounce)
            if (currentScroll <= 0) {
                setHidden(false);
            }
            // Scroll down = cache la navbar
            else if (currentScroll > lastScroll.current) {
                setHidden(true);
            }
            // Scroll up = montre la navbar
            else if (currentScroll < lastScroll.current) {
                setHidden(false);
            }

            lastScroll.current = currentScroll;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [open]);
    return (
        <>
            <nav className={hidden ? "navbar hidden" : "navbar"}>
                <div className="global-wrapper">
                    <div className="navbar-content">
                        <h1 className="navbar-title lossnear-gradient" onClick={() => { setOpen(false); }}>LossNear</h1>

                        <div className="navbar-right">
                            {/* avatar logged */}
                            {user && (
                                <div className="user-container">
                                    <div className="avatar-icon">
                                        {!avatarError ? (
                                            <img
                                                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128`}
                                                alt={user.username}
                                                onError={() => setAvatarError(true)}
                                            />
                                        ) : (
                                            <DefaultAvatar username={user.username} />
                                        )}
                                    </div>
                                    <h2>{user.username}</h2>
                                </div>
                            )}
                            {!user && (
                                <div className="user-container">
                                    <button className="button-loginout" onClick={() => setShowLoginModal(true)}>Connexion</button>
                                </div>
                            )}
                            {/* Bouton menu mobile */}
                            <button
                                id="nav-burger"
                                className="burger"
                                aria-label="menu"
                                onClick={() => setOpen(!open)}
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                        {/* Liens */}
                        <div className={`navbar-links ${open ? "open blur-bg" : ""}`} onClick={() => {
                            setOpen(false);
                            console.log("close")
                        }}>
                            <ul onClick={(e) => e.stopPropagation()} className="navbar-links-list">
                                <li><Link href="/" onClick={() => setOpen(false)}>Accueil</Link></li>
                                <li><Link href="/about" onClick={() => setOpen(false)}>À propos</Link></li>
                                <li><Link href="/status" onClick={() => setOpen(false)}>Statut</Link></li>
                                <li><Link href="/custom" onClick={() => setOpen(false)}>Personnalisé</Link></li>
                                {/* SECTION AUTH */}
                                {user && (
                                    <div className="nav-auth container-logged navbar-links-list">

                                        <li><Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
                                        <li id="nav-logout"><Link href="" className="button-loginout" onClick={logout}>Deconnexion</Link></li>
                                    </div>
                                )}
                                {!user && (
                                    <div className="nav-auth container-not-logged navbar-links-list">
                                        <li id="nav-login"><Link href="#" className="button-loginout" onClick={(e) => { e.preventDefault(); setShowLoginModal(true); }}>Connexion</Link></li>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
            {/* La  modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
}
