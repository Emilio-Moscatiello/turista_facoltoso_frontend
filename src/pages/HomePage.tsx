import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">
                Turista Facoltoso – Backoffice
            </h1>

            <p className="text-lg">
                Pannello di gestione per utenti, host, abitazioni e statistiche.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/utenti" className="btn btn-primary">
                    Gestione Utenti
                </Link>

                <Link to="/host" className="btn btn-secondary">
                    Gestione Host
                </Link>

                <Link to="/abitazioni" className="btn btn-accent">
                    Abitazioni & Statistiche
                </Link>

                <Link to="/prenotazioni" className="btn btn-outline">
                    Prenotazioni
                </Link>
            </div>
        </div>
    );
}
