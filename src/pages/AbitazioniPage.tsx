import { useState } from "react";
import { getAbitazioniByCodiceHost } from "../api/backend";
import AbitazioniTable from "../myComponents/tables/AbitazioniTable";
import type { Abitazione } from "../models/dto";

export default function AbitazioniPage() {
    const [codiceHost, setCodiceHost] = useState<string>("");
    const [abitazioni, setAbitazioni] = useState<Abitazione[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
        <div className="p-6">
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

        </div>
    );
}
