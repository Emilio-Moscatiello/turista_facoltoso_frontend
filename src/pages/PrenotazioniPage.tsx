import { useEffect, useState } from "react";
import {
    getUltimaPrenotazioneUtente,
    getAllHost,
    getPrenotazioniByHostId,
} from "../api/backend";
import FeedbackForm from "@/myComponents/forms/FeedbackForm";

export default function PrenotazioniPage() {

    /* ultima prenotazione utente */

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
        } catch {
            setErrorUltima("Nessuna prenotazione trovata");
        } finally {
            setLoadingUltima(false);
        }
    };

    /* prenotazioni per host */

    const [hosts, setHosts] = useState<any[]>([]);
    const [openHostId, setOpenHostId] = useState<string | null>(null);
    const [prenotazioniHost, setPrenotazioniHost] = useState<any[]>([]);
    const [loadingHost, setLoadingHost] = useState(false);

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
        <div className="space-y-12">

            {/* ultima prenotazione per utente */}
            <section>
                <h1 className="text-2xl font-semibold mb-4">
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

                    <button
                        className="btn btn-primary"
                        onClick={handleSearchUltima}
                    >
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

            {/* prenotazioni per host */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Prenotazioni per Host
                </h2>

                {hosts.map((h) => (
                    <div key={h.id} className="card bg-base-100 shadow mb-4">
                        <div
                            className="card-body cursor-pointer"
                            onClick={() => toggleHost(h.id)}
                        >
                            <h3 className="font-semibold">
                                {h.codiceHost} – {h.utenteId.slice(0, 8)}…
                            </h3>
                        </div>

                        {openHostId === h.id && (
                            <div className="px-4 pb-4">
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
                                                <tr key={p.prenotazioneId}>

                                                    <td className="font-mono text-xs">
                                                        {p.utenteId.slice(0, 8)}…
                                                    </td>
                                                    <td>{p.abitazioneNome}</td>
                                                    <td>{p.dataInizio}</td>
                                                    <td>{p.dataFine}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFeedbackPrenotazioneId(p.prenotazioneId);
                                                            }}
                                                        >
                                                            Lascia feedback
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* feedback */}

            {feedbackPrenotazioneId && (
                <FeedbackForm
                    key={feedbackPrenotazioneId}
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
