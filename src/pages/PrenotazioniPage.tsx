import { useState } from "react";
import { getUltimaPrenotazioneUtente } from "../api/backend";

export default function PrenotazioniPage() {
    const [utenteId, setUtenteId] = useState<string>("");
    const [prenotazione, setPrenotazione] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!utenteId) {
            setError("Inserisci un ID utente valido");
            return;
        }

        setLoading(true);
        setError(null);
        setPrenotazione(null);

        try {
            const data = await getUltimaPrenotazioneUtente(utenteId);
            setPrenotazione(data);
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
            <h1 className="text-2xl font-bold mb-4">
                Ultima prenotazione per utente
            </h1>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Inserisci ID utente (UUID)"
                    className="input input-bordered w-full max-w-md"
                    value={utenteId}
                    onChange={(e) => setUtenteId(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleSearch}>
                    Cerca
                </button>
            </div>

            {loading && <p className="text-info">Caricamento...</p>}
            {error && <p className="text-error">{error}</p>}

            {prenotazione && (
                <div className="card bg-base-100 shadow mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Dettagli prenotazione</h2>

                        <p>
                            <strong>Data inizio:</strong> {prenotazione.dataInizio}
                        </p>
                        <p>
                            <strong>Data fine:</strong> {prenotazione.dataFine}
                        </p>
                        <p>
                            <strong>Abitazione:</strong>{" "}
                            {prenotazione.abitazioneNome}
                        </p>
                        <p>
                            <strong>Utente:</strong>{" "}
                            {prenotazione.utenteNome} {prenotazione.utenteCognome}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
