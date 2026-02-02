import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-base-200">
            {/* NAVBAR */}
            <div className="navbar bg-base-100 shadow">
                <div className="flex-1">
                    <Link
                        to="/"
                        className="text-xl font-semibold btn btn-ghost normal-case"
                    >
                        Turista per sempre
                    </Link>
                </div>
                <div className="flex gap-4">
                    <Link className="btn btn-ghost" to="/abitazioni">
                        Abitazioni
                    </Link>
                    <Link className="btn btn-ghost" to="/prenotazioni">
                        Prenotazioni
                    </Link>
                    <Link className="btn btn-ghost" to="/host">
                        Host
                    </Link>
                    <Link className="btn btn-ghost" to="/utenti">
                        Utenti
                    </Link>
                </div>
            </div>

            {/* CONTENUTO */}
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
