import { useEffect, useState } from "react";
import { createPrenotazioneForUtente, getAbitazioni } from "../../api/backend";



interface Props {
    utenteId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PrenotazioneForm({
    utenteId,
    onSuccess,
    onCancel,
}: Props) {
    const [abitazioni, setAbitazioni] = useState<any[]>([]);
    const [abitazioneId, setAbitazioneId] = useState("");
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAbitazioni().then(setAbitazioni);
    }, []);



    const handleSubmit = async () => {
        try {
            await createPrenotazioneForUtente(utenteId, {
                abitazioneId,
                dataInizio,
                dataFine,
            });
            onSuccess();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Errore");
        }
    };

    return (
        <div className="card bg-base-100 shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Nuova prenotazione</h3>

            {error && <p className="text-error">{error}</p>}

            <select
                className="select select-bordered w-full mb-2"
                value={abitazioneId}
                onChange={(e) => setAbitazioneId(e.target.value)}
            >
                <option value="">Seleziona abitazione</option>
                {abitazioni.map((a) => (
                    <option key={a.id} value={a.id}>
                        {a.nome} – {a.indirizzo}
                    </option>
                ))}
            </select>

            <input
                type="date"
                className="input input-bordered w-full mb-2"
                value={dataInizio}
                onChange={(e) => setDataInizio(e.target.value)}
            />

            <input
                type="date"
                className="input input-bordered w-full mb-2"
                value={dataFine}
                onChange={(e) => setDataFine(e.target.value)}
            />

            <div className="flex gap-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Salva
                </button>
                <button className="btn btn-error" onClick={onCancel}>
                    Annulla
                </button>
            </div>
        </div>
    );
}
