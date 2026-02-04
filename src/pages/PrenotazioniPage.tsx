import { useEffect, useState } from "react";
import {
    getUltimaPrenotazioneUtente,
    getAllHost,
    getPrenotazioniByHostId,
} from "../api/backend";
import FeedbackForm from "@/myComponents/forms/FeedbackForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
            <Card>
                <CardHeader>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl">
                            Ultima prenotazione per utente
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Inserisci l&apos;ID utente per recuperare l&apos;ultima prenotazione effettuata.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <Input
                            type="text"
                            placeholder="Inserisci ID utente (UUID)"
                            className="md:max-w-md"
                            value={utenteId}
                            onChange={(e) => setUtenteId(e.target.value)}
                        />

                        <Button className="md:self-start" onClick={handleSearchUltima}>
                            Cerca
                        </Button>
                    </div>

                    {loadingUltima && (
                        <p className="text-sm text-muted-foreground">Caricamento...</p>
                    )}
                    {errorUltima && (
                        <p className="text-sm text-destructive">
                            {errorUltima}
                        </p>
                    )}

                    {ultimaPrenotazione && (
                        <Card className="border border-dashed bg-card/60">
                            <CardContent className="grid gap-2 py-4 md:grid-cols-2">
                                <p>
                                    <strong>Dal:</strong> {ultimaPrenotazione.dataInizio}
                                </p>
                                <p>
                                    <strong>Al:</strong> {ultimaPrenotazione.dataFine}
                                </p>
                                <p>
                                    <strong>Abitazione:</strong>{" "}
                                    {ultimaPrenotazione.abitazioneNome}
                                </p>
                                <p>
                                    <strong>Utente:</strong>{" "}
                                    {ultimaPrenotazione.utenteNome}{" "}
                                    {ultimaPrenotazione.utenteCognome}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* prenotazioni per host */}
            <section className="space-y-4">
                <div>
                    <h2 className="mb-1 text-2xl font-semibold">
                        Prenotazioni per Host
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Espandi un host per visualizzare le prenotazioni associate e lasciare un feedback.
                    </p>
                </div>

                {hosts.map((h) => (
                    <Card
                        key={h.id}
                        className="cursor-pointer transition hover:border-primary/50"
                        onClick={() => toggleHost(h.id)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between gap-3">
                            <div>
                                <CardTitle className="text-base">
                                    {h.codiceHost} – {h.utenteId.slice(0, 8)}…
                                </CardTitle>
                                <p className="text-xs text-muted-foreground">
                                    Clicca per mostrare/nascondere le prenotazioni
                                </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {openHostId === h.id ? "Nascondi" : "Mostra"}
                            </span>
                        </CardHeader>
                        {openHostId === h.id && (
                            <CardContent className="space-y-3">
                                {loadingHost && (
                                    <p className="text-sm text-muted-foreground">
                                        Caricamento...
                                    </p>
                                )}

                                {!loadingHost && prenotazioniHost.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        Nessuna prenotazione
                                    </p>
                                )}

                                {prenotazioniHost.length > 0 && (
                                    <Table className="mt-2 rounded-xl border bg-card/40 shadow-sm">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Utente</TableHead>
                                                <TableHead>Abitazione</TableHead>
                                                <TableHead>Dal</TableHead>
                                                <TableHead>Al</TableHead>
                                                <TableHead />
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {prenotazioniHost.map((p) => (
                                                <TableRow key={p.prenotazioneId}>
                                                    <TableCell>
                                                        <span className="font-medium">
                                                            {[p.utenteNome, p.utenteCognome].filter(Boolean).join(" ") || p.utenteId.slice(0, 8) + "…"}
                                                        </span>
                                                        {(p.utenteNome || p.utenteCognome) && (
                                                            <span className="ml-1 font-mono text-xs text-muted-foreground">
                                                                ({p.utenteId.slice(0, 8)}…)
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{p.abitazioneNome}</TableCell>
                                                    <TableCell>{p.dataInizio}</TableCell>
                                                    <TableCell>{p.dataFine}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFeedbackPrenotazioneId(
                                                                    p.prenotazioneId,
                                                                );
                                                            }}
                                                        >
                                                            Lascia feedback
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        )}
                    </Card>
                ))}
            </section>

            {/* feedback */}
            {feedbackPrenotazioneId && (
                <Card>
                    <CardContent>
                        <FeedbackForm
                            key={feedbackPrenotazioneId}
                            prenotazioneId={feedbackPrenotazioneId}
                            onSuccess={() => {
                                alert("Feedback inviato");
                                setFeedbackPrenotazioneId(null);
                            }}
                            onCancel={() => setFeedbackPrenotazioneId(null)}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
