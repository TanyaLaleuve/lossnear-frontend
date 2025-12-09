"use client";
import { useAuth } from "@/app/context/AuthContext";

export default function ServerList() {
  const { user } = useAuth();
  if(!user) {
    return null;
  }
    return ( 
        <>
            <div className="server-list">
                <h2>Vos Serveurs</h2>
            </div>
        </>
    );
}