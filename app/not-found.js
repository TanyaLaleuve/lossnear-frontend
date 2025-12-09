// app/not-found.js
import Link from 'next/link';
export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page introuvable</h2>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            <Link href="/" className="button-home">
                Retour à l'accueil
            </Link>
        </div>
    );
}