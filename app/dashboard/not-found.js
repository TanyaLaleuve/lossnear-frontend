"use client";
// app/dashboard/not-found.js
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DashboardNotFound() {
  const params = useParams();

  // The catch-all route passes the unmatched segments in params.catchAll.
  const catchAll = Array.isArray(params?.catchAll)
    ? params.catchAll
    : typeof params?.catchAll === "string"
    ? [params.catchAll]
    : [];

  // Look for /dashboard/server/{id}/... and extract the id if present.
  const page = catchAll.map((segment, index) => {
    
    return segment;
  }).join("/");


  return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page <em>{page ?? "inconnu"}</em> introuvable</h2>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            <Link href="/dashboard" className="button-home">
                Retour
            </Link>
        </div>    
    );
}
