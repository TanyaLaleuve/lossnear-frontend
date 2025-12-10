"use client";
export default function Home() {
  return (
    <div className="global-wrapper">
      <main className="global-main">
        <h1 className="lossnear-gradient">LossNear</h1>
        <p>Le meilleur bot pour tous les serveurs discord</p>
        <button className="btn btn-primary btn-lg" onClick={()=>{
          document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}>Ajouter LossNear à votre serveur</button>
      </main>
    </div>
  );
}
