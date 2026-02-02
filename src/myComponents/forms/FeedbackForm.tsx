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
    const [titolo, setTitolo] = useState("");
    const [testo, setTesto] = useState("");
    const [punteggio, setPunteggio] = useState(5);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            await createFeedbackForPrenotazione(prenotazioneId, {
                titolo,
                testo,
                punteggio,
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

            <input
                className="input input-bordered w-full mb-2"
                placeholder="Titolo"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
            />

            <select
                className="select select-bordered w-full mb-2"
                value={punteggio}
                onChange={(e) => setPunteggio(Number(e.target.value))}
            >
                {[1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>
                        {v} ⭐
                    </option>
                ))}
            </select>

            <textarea
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Testo"
                value={testo}
                onChange={(e) => setTesto(e.target.value)}
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
