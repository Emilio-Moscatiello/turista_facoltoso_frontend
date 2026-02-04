import { useEffect, useState } from "react";
import {
    getAbitazioni,
    getAbitazioniByCodiceHost,
    getAbitazionePiuGettonata,
    getMediaPostiLetto,
} from "../api/backend";
import AbitazioniTable from "../myComponents/tables/AbitazioniTable";
import AggiungiPrenotazioneDialog from "@/myComponents/forms/AggiungiPrenotazioneDialog";
import type { Abitazione, AbitazioneGettonata } from "../models/dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AbitazioniPage() {
    const [codiceHost, setCodiceHost] = useState("");
    const [abitazioni, setAbitazioni] = useState<Abitazione[]>([]);
    const [tutteAbitazioni, setTutteAbitazioni] = useState<Abitazione[]>([]);
    const [abitazioneGettonata, setAbitazioneGettonata] =
        useState<AbitazioneGettonata | null>(null);
    const [mediaPostiLetto, setMediaPostiLetto] = useState<number | null>(null);
    const [abitazionePerPrenotazione, setAbitazionePerPrenotazione] = useState<Abitazione | null>(null);

    const [loading, setLoading] = useState(false);
    const [loadingTutte, setLoadingTutte] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAbitazionePiuGettonata()
            .then(setAbitazioneGettonata)
            .catch(console.error);
        getMediaPostiLetto()
            .then(setMediaPostiLetto)
            .catch(console.error);
    }, []);

    useEffect(() => {
        setLoadingTutte(true);
        getAbitazioni()
            .then(setTutteAbitazioni)
            .catch(() => setTutteAbitazioni([]))
            .finally(() => setLoadingTutte(false));
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
            setError(err instanceof Error ? err.message : "Errore sconosciuto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Ricerca abitazioni per codice host</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Inserisci il codice host per visualizzare le sue abitazioni.
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <Input
                            type="text"
                            placeholder="Inserisci codice host (es. HOST001)"
                            className="w-full md:max-w-sm"
                            value={codiceHost}
                            onChange={(e) => setCodiceHost(e.target.value)}
                        />
                        <Button className="md:self-start" onClick={handleSearch}>
                            Cerca
                        </Button>
                    </div>
                    {loading && <p className="text-sm text-muted-foreground">Caricamento...</p>}
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Tutte le abitazioni</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Elenco di tutte le abitazioni. Usa il bottone per aggiungere una prenotazione (verrà verificata la disponibilità nel periodo scelto).
                    </p>
                </CardHeader>
                <CardContent>
                    {loadingTutte ? (
                        <p className="text-sm text-muted-foreground">Caricamento...</p>
                    ) : (
                        <AbitazioniTable
                            abitazioni={tutteAbitazioni}
                            onAddPrenotazione={(a) => setAbitazionePerPrenotazione(a)}
                        />
                    )}
                </CardContent>
            </Card>

            {codiceHost && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Risultati ricerca per codice host</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AbitazioniTable
                            abitazioni={abitazioni}
                            onAddPrenotazione={(a) => setAbitazionePerPrenotazione(a)}
                        />
                    </CardContent>
                </Card>
            )}

            <AggiungiPrenotazioneDialog
                abitazione={abitazionePerPrenotazione}
                open={abitazionePerPrenotazione !== null}
                onClose={() => setAbitazionePerPrenotazione(null)}
                onSuccess={() => setAbitazionePerPrenotazione(null)}
            />

            {abitazioneGettonata && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Abitazione più gettonata (ultimo mese)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Nome:</strong> {abitazioneGettonata.nome}</p>
                            <p><strong>Indirizzo:</strong> {abitazioneGettonata.indirizzo}</p>
                            <p>
                                <strong>Prenotazioni:</strong>{" "}
                                {abitazioneGettonata.numeroPrenotazioni}
                            </p>
                        </CardContent>
                    </Card>

                    {mediaPostiLetto !== null && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Media posti letto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg">
                                    <strong>{Math.round(mediaPostiLetto)}</strong> posti letto medi
                                    per abitazione
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {mediaPostiLetto !== null && !abitazioneGettonata && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Media posti letto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            <strong>{Math.round(mediaPostiLetto)}</strong> posti letto medi
                            per abitazione
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
