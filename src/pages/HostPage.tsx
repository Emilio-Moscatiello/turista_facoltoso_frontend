import { useEffect, useState } from "react";
import {
    getAllHost,
    createHost,
    updateHost,
    deleteHost,
    getHostTopUltimoMese,
    getSuperHost,
} from "../api/backend";
import type { Host } from "../models/dto";
import HostForm from "../myComponents/forms/HostForm";
import HostTable from "../myComponents/tables/HostTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function HostPage() {
    const [superHost, setSuperHost] = useState<any[]>([]);
    const [topHost, setTopHost] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [host, setHost] = useState<Host[]>([]);
    const [hostSelezionato, setHostSelezionato] = useState<Host | null>(null);

    useEffect(() => {
        getAllHost().then(setHost);
    }, []);


    const handleLoadSuperHost = async () => {
        if (superHost.length > 0) {
            setSuperHost([]);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getSuperHost();
            setSuperHost(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoadTopHost = async () => {
        if (topHost.length > 0) {
            setTopHost([]);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getHostTopUltimoMese();
            setTopHost(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl">Gestione Host</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Consulta le performance degli host e gestisci il loro profilo.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant={superHost.length > 0 ? "outline" : "secondary"}
                                onClick={handleLoadSuperHost}
                            >
                                {superHost.length > 0 ? "Nascondi Super Host" : "Carica Super Host"}
                            </Button>
                            <Button
                                variant={topHost.length > 0 ? "outline" : "default"}
                                onClick={handleLoadTopHost}
                            >
                                {topHost.length > 0 ? "Nascondi Top Ultimo Mese" : "Carica Host Top Ultimo Mese"}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {loading && (
                        <p className="text-sm text-muted-foreground">Caricamento...</p>
                    )}
                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        {superHost.length > 0 && (
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold">Super Host</h2>
                                <Table className="rounded-xl border bg-card/40 shadow-sm">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Codice Host</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Cognome</TableHead>
                                            <TableHead>Prenotazioni</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {superHost.map((host, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{host.codiceHost}</TableCell>
                                                <TableCell>{host.nome}</TableCell>
                                                <TableCell>{host.cognome}</TableCell>
                                                <TableCell>{host.numeroPrenotazioni}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {topHost.length > 0 && (
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold">
                                    Host con più prenotazioni (ultimo mese)
                                </h2>
                                <Table className="rounded-xl border bg-card/40 shadow-sm">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Codice Host</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Cognome</TableHead>
                                            <TableHead>Prenotazioni</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topHost.map((host, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{host.codiceHost}</TableCell>
                                                <TableCell>{host.nome}</TableCell>
                                                <TableCell>{host.cognome}</TableCell>
                                                <TableCell>{host.numeroPrenotazioni}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)]">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Aggiungi / Modifica Host</h2>
                    <HostForm
                        hostSelezionato={hostSelezionato}
                        onSave={async (hostValue) => {
                            if (hostValue.id) {
                                await updateHost(hostValue.id, hostValue);
                            } else {
                                await createHost(hostValue);
                            }
                            setHostSelezionato(null);
                            setHost(await getAllHost());
                        }}
                        onCancel={() => setHostSelezionato(null)}
                    />
                </div>

                <Card>
                    <CardContent>
                        <HostTable
                            host={host}
                            onEdit={setHostSelezionato}
                            onDelete={async (id) => {
                                await deleteHost(id);
                                setHost(await getAllHost());
                            }}
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
