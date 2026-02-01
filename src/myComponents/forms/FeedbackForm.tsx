import { useState } from "react";
import { createFeedbackForPrenotazione } from "../../api/backend";

interface Props {
    prenotazioneId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function FeedbackForm({
    prenotazioneId,
    onSuccess,
    onCancel,
}: Props) {
    const [voto, setVoto] = useState(5);
    const [commento, setCommento] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            await createFeedbackForPrenotazione(prenotazioneId, {
                voto,
                commento,
            });
            onSuccess();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Errore");
        }
    };

    return (
        <div className="card bg-base-100 shadow p-4 mt-4">
            <h3 className="font-bold mb-2">Lascia un feedback</h3>

            {error && <p className="text-error">{error}</p>}

            <select
                className="select select-bordered w-full mb-2"
                value={voto}
                onChange={(e) => setVoto(Number(e.target.value))}
            >
                {[1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>
                        {v} ⭐
                    </option>
                ))}
            </select>

            <textarea
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Commento (facoltativo)"
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
            />

            <div className="flex gap-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Invia
                </button>
                <button className="btn btn-ghost" onClick={onCancel}>
                    Annulla
                </button>
            </div>
        </div>
    );
}
