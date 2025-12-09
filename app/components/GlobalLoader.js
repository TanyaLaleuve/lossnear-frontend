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
                border-radius: 50%;
                /* Conic gradient for smoother color blend */
                background: conic-gradient(
                    from 0deg,
                    #1b91f1 0deg,
                    #1b91f1 110deg,
                    rgba(27, 145, 241, 0.25) 150deg,
                    #b80099 190deg,
                    #b80099 310deg,
                    rgba(184, 0, 153, 0.25) 350deg,
                    #1b91f1 360deg
                );
                /* Hollow center to keep the ring shape */
                mask: radial-gradient(farthest-side, transparent 60%, #000 62%);
                -webkit-mask: radial-gradient(farthest-side, transparent 60%, #000 62%);
                filter: blur(0.5px);
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
