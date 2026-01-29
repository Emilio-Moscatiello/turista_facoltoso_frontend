import { useState } from "react";
import { getTopUtentiUltimoMese } from "../api/backend";

export default function UtentiPage() {
    const [utenti, setUtenti] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLoadUtenti = async () => {
        setLoading(true);
        setError(null);
        setUtenti([]);

        try {
            const data = await getTopUtentiUltimoMese();
            setUtenti(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Utenti con più giorni prenotati (ultimo mese)
            </h1>

            <button className="btn btn-primary mb-6" onClick={handleLoadUtenti}>
                Carica Top 5 Utenti
            </button>

            {loading && <p className="text-info">Caricamento...</p>}
            {error && <p className="text-error">{error}</p>}

            {utenti.length > 0 && (
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Giorni prenotati</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utenti.map((utente, index) => (
                            <tr key={index}>
                                <td>{utente.nome}</td>
                                <td>{utente.cognome}</td>
                                <td>{utente.email}</td>
                                <td>{utente.giorniPrenotati}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
