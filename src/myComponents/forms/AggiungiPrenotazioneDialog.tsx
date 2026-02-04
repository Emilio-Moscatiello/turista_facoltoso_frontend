import { useState, useEffect } from "react";
import { getUtenti, createPrenotazione } from "@/api/backend";
import type { Abitazione } from "@/models/dto";
import type { Utente } from "@/models/dto";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    abitazione: Abitazione | null;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AggiungiPrenotazioneDialog({
    abitazione,
    open,
    onClose,
    onSuccess,
}: Props) {
    const [utenti, setUtenti] = useState<Utente[]>([]);
    const [utenteId, setUtenteId] = useState("");
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            getUtenti()
                .then(setUtenti)
                .catch(() => setError("Errore caricamento utenti"));
            setUtenteId("");
            setDataInizio("");
            setDataFine("");
            setError(null);
        }
    }, [open]);

    const today = new Date().toISOString().slice(0, 10);

    const handleSubmit = async () => {
        if (!abitazione) return;
        if (!utenteId || !dataInizio || !dataFine) {
            setError("Compila tutti i campi");
            return;
        }
        if (dataInizio < today) {
            setError("La data di inizio non può essere nel passato");
            return;
        }
        if (dataFine <= dataInizio) {
            setError("La data di fine deve essere successiva alla data di inizio");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await createPrenotazione({
                utenteId,
                abitazioneId: abitazione.id,
                dataInizio,
                dataFine,
            });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore creazione prenotazione");
        } finally {
            setLoading(false);
        }
    };

    if (!abitazione) return null;

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Aggiungi prenotazione</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {abitazione.nome} – {abitazione.indirizzo}
                    </p>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="utente">Utente</Label>
                        <select
                            id="utente"
                            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            value={utenteId}
                            onChange={(e) => setUtenteId(e.target.value)}
                        >
                            <option value="">Seleziona utente</option>
                            {utenti.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.nome} {u.cognome} – {u.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dataInizio">Data inizio</Label>
                        <Input
                            id="dataInizio"
                            type="date"
                            min={today}
                            value={dataInizio}
                            onChange={(e) => setDataInizio(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dataFine">Data fine</Label>
                        <Input
                            id="dataFine"
                            type="date"
                            min={dataInizio || today}
                            value={dataFine}
                            onChange={(e) => setDataFine(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Annulla
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Salvataggio..." : "Crea prenotazione"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
