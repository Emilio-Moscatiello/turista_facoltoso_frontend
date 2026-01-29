import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">
                Turista Facoltoso – Backoffice
            </h1>

            <p className="text-lg">
                Pannello di gestione per utenti, host, abitazioni e statistiche.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/abitazioni" className="btn btn-primary">
                    Gestione Abitazioni
                </Link>

                <Link to="/prenotazioni" className="btn btn-secondary">
                    Prenotazioni
                </Link>

                <Link to="/host" className="btn btn-accent">
                    Host & Statistiche
                </Link>

                <Link to="/utenti" className="btn btn-outline">
                    Utenti
                </Link>
            </div>
        </div>
    );
}
