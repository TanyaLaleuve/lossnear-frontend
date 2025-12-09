"use client";
import { useAuth } from "../context/AuthContext";
export default function GlobalLoader() {
    const { loading } = useAuth();
    if (!loading) return null;
    return (
        <>
            <div className="global-loader-overlay">
                <div className="global-loader-spinner">
                    {/* Spinner avec ton dégradé LossNear */}
                    <div className="spinner"></div>
                    <p>Connexion en cours...</p>
                </div>
            </div>
            <style>
                {`
            .global-loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999; /* Au-dessus de tout */
            }
            .global-loader-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid transparent;
                border-top: 4px solid #1b91f1;
                border-right: 4px solid #b80099;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .global-loader-spinner p {
                color: white;
                font-size: 1.2rem;
            }
            `}
            </style>
        </>
    );
}