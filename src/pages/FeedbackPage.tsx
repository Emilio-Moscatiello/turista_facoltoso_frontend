import { useEffect, useState } from "react";
import { getFeedbacks, type FeedbackListItem } from "@/api/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

function StarRating({ punteggio }: { punteggio: number }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`${punteggio} su 5 stelle`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    className={`h-4 w-4 ${n <= punteggio ? "fill-amber-400 text-amber-500" : "text-muted-foreground/40"}`}
                />
            ))}
        </div>
    );
}

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<FeedbackListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getFeedbacks()
            .then(setFeedbacks)
            .catch(() => setError("Errore nel caricamento dei feedback"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center">
                <p className="text-muted-foreground">Caricamento feedback...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardContent className="py-6">
                    <p className="text-destructive">{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (feedbacks.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">Feedback</h1>
                    <p className="text-sm text-muted-foreground">
                        Tutti i feedback lasciati sulle prenotazioni.
                    </p>
                </div>
                <Card>
                    <CardContent className="flex min-h-[200px] flex-col items-center justify-center py-12 text-center">
                        <p className="text-muted-foreground">
                            Nessun feedback presente. I feedback vengono aggiunti dalla pagina Prenotazioni.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold">Feedback</h1>
                <p className="text-sm text-muted-foreground">
                    Tutti i feedback lasciati sulle prenotazioni ({feedbacks.length}).
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {feedbacks.map((f) => (
                    <Card key={f.id} className="overflow-hidden transition-shadow hover:shadow-md">
                        <CardHeader className="space-y-1 pb-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <CardTitle className="text-base">{f.titolo}</CardTitle>
                                <StarRating punteggio={f.punteggio} />
                            </div>
                            <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                                <Badge variant="outline" className="font-normal">
                                    {f.abitazioneNome}
                                </Badge>
                                <span>
                                    {f.utenteNome} {f.utenteCognome}
                                </span>
                                {(f.dataInizio || f.dataFine) && (
                                    <span>
                                        • {f.dataInizio ?? "—"} → {f.dataFine ?? "—"}
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                                {f.testo}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
