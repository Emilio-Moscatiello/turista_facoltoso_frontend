import { useEffect, useState } from "react";
import {
    getAbitazioniByCodiceHost,
    getAbitazionePiuGettonata,
} from "../api/backend";
import AbitazioniTable from "../myComponents/tables/AbitazioniTable";
import type { Abitazione, AbitazioneGettonata } from "../models/dto";
import { getMediaPostiLetto } from "../api/backend";


export default function AbitazioniPage() {
    const [codiceHost, setCodiceHost] = useState<string>("");
    const [abitazioni, setAbitazioni] = useState<Abitazione[]>([]);
    const [abitazioneGettonata, setAbitazioneGettonata] =
        useState<AbitazioneGettonata | null>(null);

    const [mediaPostiLetto, setMediaPostiLetto] = useState<number | null>(null);


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAbitazioneGettonata = async () => {
            try {
                const data = await getAbitazionePiuGettonata();
                setAbitazioneGettonata(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadAbitazioneGettonata();
    }, []);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const media = await getMediaPostiLetto();
                setMediaPostiLetto(media);
            } catch (err) {
                console.error(err);
            }
        };

        loadStats();
    }, []);


    const handleSearch = async () => {
        if (!codiceHost) {
            setError("Inserisci un codice host valido");
            return;
        }

        setLoading(true);
        setError(null);
        setAbitazioni([]);

        try {
            const data = await getAbitazioniByCodiceHost(codiceHost);
            setAbitazioni(data);
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
                Ricerca abitazioni per codice host
            </h1>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Inserisci codice host (es. HOST001)"
                    className="input input-bordered w-full max-w-xs"
                    value={codiceHost}
                    onChange={(e) => setCodiceHost(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleSearch}>
                    Cerca
                </button>
            </div>

            {loading && <p className="text-info">Caricamento...</p>}
            {error && <p className="text-error">{error}</p>}

            <AbitazioniTable abitazioni={abitazioni} />

            {abitazioneGettonata && (
                <div className="card bg-base-100 shadow mt-6">
                    <div className="card-body">
                        <h2 className="card-title">
                            Abitazione più gettonata (ultimo mese)
                        </h2>
                        <p>
                            <strong>Nome:</strong> {abitazioneGettonata.nome}
                        </p>
                        <p>
                            <strong>Indirizzo:</strong>{" "}
                            {abitazioneGettonata.indirizzo}
                        </p>
                        <p>
                            <strong>Prenotazioni:</strong>{" "}
                            {abitazioneGettonata.numeroPrenotazioni}
                        </p>
                    </div>
                </div>
            )}

            {mediaPostiLetto !== null && (
                <div className="card bg-base-100 shadow mt-6">
                    <div className="card-body">
                        <h2 className="card-title">Media posti letto</h2>
                        <p className="text-lg">
                            <strong>{mediaPostiLetto.toFixed(2)}</strong> posti letto medi
                            per abitazione
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
