import {
    CalendarDays,
    ChartNoAxesCombined,
    House,
    MessageSquare,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 md:px-6">
            <div className="w-full max-w-5xl space-y-10">
                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Pannello amministratore • Turista per Sempre
                    </div>

                    <img
                        src={logo}
                        alt="Turista per sempre"
                        className="h-20 w-auto md:h-28 lg:h-36"
                    />

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            Controllo totale su utenti, host e prenotazioni
                        </h1>
                        <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
                            Gestisci tutto il backoffice di Turista per Sempre da un
                           &apos;interfaccia moderna, pulita e super veloce.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                        <Button asChild size="lg">
                            <Link to="/utenti">Vai alla gestione utenti</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link to="/prenotazioni">Vedi prenotazioni</Link>
                        </Button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <UserRound className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Utenti</CardTitle>
                                        <CardDescription>
                                            Gestione account registrati
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="hidden md:inline-flex">
                                    Anagrafiche
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Crea, modifica ed elimina utenti. Aggiungi rapidamente nuove
                                prenotazioni direttamente dalla tabella.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link to="/utenti">Gestione Utenti</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <House className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Host</CardTitle>
                                        <CardDescription>
                                            Proprietari e codici host
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="hidden md:inline-flex">
                                    Network
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Visualizza performance, super host e top host dell&apos;ultimo
                                mese e gestisci le loro abitazioni.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link to="/host">Gestione Host</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-sky-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                                        <ChartNoAxesCombined className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Abitazioni</CardTitle>
                                        <CardDescription>
                                            Ricerca e statistiche
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="hidden md:inline-flex">
                                    Analytics
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Filtra per codice host, analizza l&apos;abitazione più gettonata
                                e la media dei posti letto.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link to="/abitazioni">Abitazioni &amp; Statistiche</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                                        <CalendarDays className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Prenotazioni</CardTitle>
                                        <CardDescription>
                                            Cronologia &amp; feedback
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="hidden md:inline-flex">
                                    Operativo
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Trova l&apos;ultima prenotazione di un utente, esplora quelle per
                                host e raccogli feedback mirati.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link to="/prenotazioni">Gestione Prenotazioni</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Feedback</CardTitle>
                                        <CardDescription>
                                            Recensioni e valutazioni
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="hidden md:inline-flex">
                                    Recensioni
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Consulta tutti i feedback lasciati dagli utenti sulle
                                prenotazioni, con punteggio e dettagli.
                            </p>
                            <Button asChild className="w-full" variant="outline">
                                <Link to="/feedback">Vedi tutti i Feedback</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground/70">
                    © Emilio Moscatiello – Turista per Sempre Backoffice
                </p>
            </div>
        </div>
    );
}
