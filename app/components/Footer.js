"use client"
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="global-wrapper">
                <div className="global-footer">
                    <h1 className="global-footer-title lossnear-gradient" onClick={() => { window.location.href = "/" }}>LossNear</h1>
                    <article className="global-footer-links footer-list">
                        <h2 className="footer-list-title">Liens</h2>
                        <ul>
                            <li><Link href="/">Accueil</Link></li>
                            <li><Link href="/about">À propos</Link></li>
                            <li><Link href="/status">Statut</Link></li>
                            <li><Link href="/custom">Personnalisé</Link></li>
                        </ul>
                    </article>
                    <article className="global-footer-utils footer-list">
                        <h2 className="footer-list-title">Utiles</h2>
                        <ul>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                            <li><Link href="https://doc.lossnear.com">Documentation</Link></li>
                            <li><Link href="https://github.com/lossnear">Github</Link></li>
                            <li><Link href="https://discord.gg/lossnear">Support server</Link></li>
                        </ul>
                    </article>
                    <article className="global-footer-legal footer-list">
                        <h2 className="footer-list-title">Legal</h2>
                        <ul>
                            <li><Link href="/privacy">Confidentialité</Link></li>
                            <li><Link href="/cgu">Conditions d'utilisation</Link></li>
                            <li><Link href="/legal">Mentions légales</Link></li>
                        </ul>
                    </article>
                    <aside className="global-footer-social">
                        <ul>
                            <li><Link href="https://discord.gg/D857rxz"><FaDiscord className="global-footer-social-item" /></Link></li>
                            <li><Link href="https://github.com/TanyaLaleuve"><FaGithub className="global-footer-social-item" /></Link></li>
                        </ul>
                    </aside>
                    <article className="global-footer-copyright">
                        <p><strong>© <time dateTime="2025">2025</time> - <time dateTime={new Date().getFullYear()}>{new Date().getFullYear()}</time> LossNear</strong> Non affilié à Discord Inc.</p>
                    </article>
                </div>
            </div>
        </footer>
    );
}   