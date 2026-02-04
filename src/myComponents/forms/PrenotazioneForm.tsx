import { useState, useEffect } from "react";
import { getAbitazioni, createPrenotazioneForUtente } from "@/api/backend";
import type { Abitazione } from "@/models/dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    utenteId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PrenotazioneForm({ utenteId, onSuccess, onCancel }: Props) {
    const [abitazioni, setAbitazioni] = useState<Abitazione[]>([]);
    const [abitazioneId, setAbitazioneId] = useState("");
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAbitazioni()
            .then(setAbitazioni)
            .catch(() => setError("Errore caricamento abitazioni"));
    }, []);

    const handleSubmit = async () => {
        if (!abitazioneId || !dataInizio || !dataFine) {
            setError("Compila tutti i campi");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await createPrenotazioneForUtente(utenteId, {
                abitazioneId,
                dataInizio,
                dataFine,
            });
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore creazione prenotazione");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold">Nuova prenotazione</h3>
                <p className="text-sm text-muted-foreground">
                    Aggiungi una prenotazione per questo utente.
                </p>
            </div>
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="space-y-2">
                <Label htmlFor="abitazione">Abitazione</Label>
                <select
                    id="abitazione"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
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
            </div>
            <div className="space-y-2">
                <Label htmlFor="dataInizio">Data inizio</Label>
                <Input
                    id="dataInizio"
                    type="date"
                    value={dataInizio}
                    onChange={(e) => setDataInizio(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dataFine">Data fine</Label>
                <Input
                    id="dataFine"
                    type="date"
                    value={dataFine}
                    onChange={(e) => setDataFine(e.target.value)}
                />
            </div>
            <div className="flex gap-2 pt-2">
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Salvataggio..." : "Crea prenotazione"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Annulla
                </Button>
            </div>
        </div>
    );
}
