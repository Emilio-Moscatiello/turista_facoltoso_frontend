import { useState } from "react";
import { createFeedbackForPrenotazione } from "../../api/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Lascia un feedback
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="titolo">Titolo</Label>
                        <Input
                            id="titolo"
                            placeholder="Titolo"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <Label>Punteggio</Label>
                        <Select
                            value={String(punteggio)}
                            onValueChange={(value) => setPunteggio(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleziona il punteggio" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5].map((v) => (
                                    <SelectItem key={v} value={String(v)}>
                                        {v} ⭐
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="testo">Testo</Label>
                        <Textarea
                            id="testo"
                            className="min-h-24"
                            placeholder="Scrivi qui il tuo feedback..."
                            value={testo}
                            onChange={(e) => setTesto(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    <Button onClick={handleSubmit}>Invia</Button>
                    <Button variant="ghost" type="button" onClick={onCancel}>
                        Annulla
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
