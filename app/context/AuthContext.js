"use client"

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);


    async function checkSession() {
        try {
            // Appel API : Est-ce qu'il y a une session active ?
            const res = await fetch('/api/mock/auth/session');
            const { success, data } = await res.json();
            if (success && data.authenticated) {
                // Si oui, récupère les données complètes de l'user
                await fetchUser();
            }
        } catch (error) {
            console.error('Erreur session:', error);
        } finally {
            setLoading(false); // Fini de charger
        }
    }
    async function fetchUser() {
        try {
            const res = await fetch('/api/mock/user');
            const { success, data } = await res.json();

            if (success) {
                setUser(data); // Stocke l'user dans le state
            }
        } catch (error) {
            console.error('Erreur user:', error);
        }
    }
    // 4️⃣ Fonction de connexion
    async function login() {
        try {
            setLoading(true);
            // Crée une session
            const res = await fetch('/api/mock/auth/session', {
                method: 'POST'
            });
            const { success } = await res.json();
            if (success) {
                // Récupère les données user
                await fetchUser();
                return true;
            }
        } catch (error) {
            console.error('Erreur login:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }  // 5️⃣ Fonction de déconnexion
    async function logout() {
        try {
            await fetch('/api/mock/auth/session', {
                method: 'DELETE'
            });
            setUser(null); // Clear l'user
        } catch (error) {
            console.error('Erreur logout:', error);
        }finally {
           // window.location.href = "/";
            setLoading(false);
        }
    }
    // 6️⃣ Valeur partagée à tous les composants
    const value = {
        user,
        loading,
        login,
        logout
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};
// 7️⃣ Hook personnalisé pour utiliser le Context facilement
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
}