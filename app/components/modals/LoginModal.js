"use client"

import { FaDiscord } from "react-icons/fa";
import ModalGlobalLayout from "./ModalGlobalLayout";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
    const { login } = useAuth();

    async function handleDiscordLogin() {
        const success = await login();
        if (success) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <ModalGlobalLayout isOpen={isOpen} onClose={onClose} title="Connexion">
            <section className="modal-login-discord">
                <h2> <FaDiscord /> Discord</h2>
                <p>Connecte-toi avec Discord pour accéder au dashboard</p>
                <button className="btn-discord" onClick={handleDiscordLogin}>
                    Se connecter avec Discord
                </button>
                <button className="btn-forget-password">
                    Compte perdu ?
                </button>
            </section>
        </ModalGlobalLayout>
    );
}
