import { notFound } from "next/navigation";

export default async function DashboardServerPage({ params }) {
  const { serverId } = await params;

  if (!serverId) {
    return notFound();
  }

  return (
    <div className="global-wrapper">
      <main className="dashboard-main">
        <h1 className="lossnear-gradient">Serveur {serverId}</h1>
        <p>Contenu du serveur ici.</p>
      </main>
    </div>
  );
}
