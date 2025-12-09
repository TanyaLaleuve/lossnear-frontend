import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import GlobalLoader from "./components/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LossNear",
  description: "LossNear - Le meilleur bot discord pour tous les serveurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GlobalLoader />
          <Navbar />
          <div className="navbar-height"></div>
          <div className="global-layout-content">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html >
  );
}
