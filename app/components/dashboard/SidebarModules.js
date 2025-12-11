"use client";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

export default function SidebarModules() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const segments = pathname.split("/").filter(Boolean); // ex: ["dashboard","server","123","..."]
  const isServer = segments[0] === "dashboard" && segments[1] === "server" && segments[2];
  const serverId = isServer ? segments[2] : "-1";

  return (
    <div className="global-wrapper">
      <div className="sidebar-modules">
        <h2>Modules Sidebar</h2>
        <p>{serverId}</p>
        <p>Contenu des modules ici.</p>
      </div>
    </div>
  );
}