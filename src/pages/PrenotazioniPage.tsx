import { useEffect, useState } from "react";
import {
    getUltimaPrenotazioneUtente,
    getAllHost,
    getPrenotazioniByHostId,
} from "../api/backend";
import FeedbackForm from "@/myComponents/forms/FeedbackForm";

export default function PrenotazioniPage() {
    // ===== TASK 1: ULTIMA PRENOTAZIONE UTENTE (NON TOCCATO) =====
    const [utenteId, setUtenteId] = useState("");
    const [ultimaPrenotazione, setUltimaPrenotazione] = useState<any | null>(null);
    const [loadingUltima, setLoadingUltima] = useState(false);
    const [errorUltima, setErrorUltima] = useState<string | null>(null);

    const handleSearchUltima = async () => {
        if (!utenteId) {
            setErrorUltima("Inserisci un ID utente valido");
            return;
        }

        setLoadingUltima(true);
        setErrorUltima(null);
        setUltimaPrenotazione(null);

        try {
            const data = await getUltimaPrenotazioneUtente(utenteId);
            setUltimaPrenotazione(data);
        } catch (e) {
            setErrorUltima("Nessuna prenotazione trovata");
        } finally {
            setLoadingUltima(false);
        }
    };

    // ===== TASK 2: PRENOTAZIONI PER HOST (OPZIONE B) =====
    const [hosts, setHosts] = useState<any[]>([]);
    const [openHostId, setOpenHostId] = useState<string | null>(null);
    const [prenotazioniHost, setPrenotazioniHost] = useState<any[]>([]);
    const [loadingHost, setLoadingHost] = useState(false);

    // ===== FEEDBACK =====
    const [feedbackPrenotazioneId, setFeedbackPrenotazioneId] =
        useState<string | null>(null);

    useEffect(() => {
        getAllHost().then(setHosts);
    }, []);

    const toggleHost = async (hostId: string) => {
        if (openHostId === hostId) {
            setOpenHostId(null);
            setPrenotazioniHost([]);
            return;
        }

        setOpenHostId(hostId);
        setLoadingHost(true);

        try {
            const data = await getPrenotazioniByHostId(hostId);
            setPrenotazioniHost(data);
        } catch {
            setPrenotazioniHost([]);
        } finally {
            setLoadingHost(false);
        }
    };

    return (
        <div className="space-y-10">
            {/* ================= SEZIONE A ================= */}
            <section>
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

                    <button className="btn btn-primary" onClick={handleSearchUltima}>
                        Cerca
                    </button>
                </div>

                {loadingUltima && <p className="text-info">Caricamento...</p>}
                {errorUltima && <p className="text-error">{errorUltima}</p>}

                {ultimaPrenotazione && (
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p><strong>Dal:</strong> {ultimaPrenotazione.dataInizio}</p>
                            <p><strong>Al:</strong> {ultimaPrenotazione.dataFine}</p>
                            <p><strong>Abitazione:</strong> {ultimaPrenotazione.abitazioneNome}</p>
                            <p>
                                <strong>Utente:</strong>{" "}
                                {ultimaPrenotazione.utenteNome}{" "}
                                {ultimaPrenotazione.utenteCognome}
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* ================= SEZIONE B ================= */}
            <section>
                <h2 className="text-2xl font-bold mb-4">
                    Prenotazioni per Host
                </h2>

                {hosts.map((h) => (
                    <div key={h.id} className="card bg-base-100 shadow mb-3">
                        <div
                            className="card-body cursor-pointer"
                            onClick={() => toggleHost(h.id)}
                        >
                            <h3 className="font-bold">
                                {h.codiceHost} – {h.utenteId.slice(0, 8)}…
                            </h3>

                            {openHostId === h.id && (
                                <>
                                    {loadingHost && <p>Caricamento...</p>}

                                    {!loadingHost && prenotazioniHost.length === 0 && (
                                        <p className="text-sm">Nessuna prenotazione</p>
                                    )}

                                    {prenotazioniHost.length > 0 && (
                                        <table className="table table-zebra mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Utente</th>
                                                    <th>Abitazione</th>
                                                    <th>Dal</th>
                                                    <th>Al</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {prenotazioniHost.map((p) => (
                                                    <tr key={p.id}>
                                                        <td className="font-mono text-xs">
                                                            {p.utenteId.slice(0, 8)}…
                                                        </td>
                                                        <td>{p.abitazioneNome}</td>
                                                        <td>{p.dataInizio}</td>
                                                        <td>{p.dataFine}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-secondary"
                                                                onClick={() =>
                                                                    setFeedbackPrenotazioneId(p.id)
                                                                }
                                                            >
                                                                Lascia feedback
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* ================= FEEDBACK ================= */}
            {feedbackPrenotazioneId && (
                <FeedbackForm
                    prenotazioneId={feedbackPrenotazioneId}
                    onSuccess={() => {
                        alert("Feedback inviato");
                        setFeedbackPrenotazioneId(null);
                    }}
                    onCancel={() => setFeedbackPrenotazioneId(null)}
                />
            )}
        </div>
    );
}
