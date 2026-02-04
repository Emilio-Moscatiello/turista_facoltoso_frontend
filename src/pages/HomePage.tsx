import { CalendarDays, ChartNoAxesCombined, House, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function HomePage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-6">
            <div className="w-full max-w-5xl text-center space-y-10">

                {/* Header */}
                <div className="space-y-2 justify-center items-center flex flex-col">
                    <img
                        src={logo}
                        alt="Turista per sempre"
                        className="h-10 md:h-54 w-auto"
                    />
                    <p className="text-lg text-base-content/70">
                        Backoffice – pannello gestionale
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center space-y-3">
                            <div className="text-4xl"><UserRound /></div>
                            <h2 className="card-title">Utenti</h2>
                            <p className="text-sm text-base-content/70">
                                Gestione utenti registrati
                            </p>
                            <Link to="/utenti" className="btn btn-primary w-full">
                                Gestione Utenti
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center space-y-3">
                            <div className="text-4xl"><House /></div>
                            <h2 className="card-title">Host</h2>
                            <p className="text-sm text-base-content/70">
                                Gestione host e proprietari
                            </p>
                            <Link to="/host" className="btn btn-primary w-full">
                                Gestione Host
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center space-y-3">
                            <div className="text-4xl"><ChartNoAxesCombined /></div>
                            <h2 className="card-title">Abitazioni</h2>
                            <p className="text-sm text-base-content/70">
                                Abitazioni e statistiche
                            </p>
                            <Link to="/abitazioni" className="btn btn-primary w-full">
                                Abitazioni & Statistiche
                            </Link>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center space-y-3">
                            <div className="text-4xl"><CalendarDays /></div>
                            <h2 className="card-title">Prenotazioni</h2>
                            <p className="text-sm text-base-content/70">
                                Prenotazioni e feedback
                            </p>
                            <Link to="/prenotazioni" className="btn btn-primary w-full">
                                Prenotazioni
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Footer note */}
                <p className="text-xs text-base-content/50">
                    © Emilio Moscatiello
                </p>

            </div>
        </div>
    );
}
