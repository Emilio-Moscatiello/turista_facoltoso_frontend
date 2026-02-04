import { useEffect, useState } from "react";
import {
    getTopUtentiUltimoMese,
    getAllUtenti,
    createUtente,
    updateUtente,
    deleteUtente,
} from "../api/backend";

import UtentiTable from "../myComponents/tables/UtentiTable";
import UtenteForm from "../myComponents/forms/UtenteForm";
import type { Utente } from "../models/dto";
import PrenotazioneForm from "@/myComponents/forms/PrenotazioneForm";
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

export default function UtentiPage() {

    const [utentiTop, setUtentiTop] = useState<any[]>([]);


    const [utenti, setUtenti] = useState<Utente[]>([]);
    const [utenteSelezionato, setUtenteSelezionato] = useState<Utente | null>(null);

    const [prenotazioneUtenteId, setPrenotazioneUtenteId] = useState<string | null>(null);


    useEffect(() => {
        getAllUtenti().then(setUtenti);
    }, []);

    const handleSave = async (utente: Utente) => {
        if (utente.id) {
            await updateUtente(utente.id, utente);
        } else {
            await createUtente(utente);
        }
        setUtenteSelezionato(null);
        setUtenti(await getAllUtenti());
    };

    const handleDelete = async (id: string) => {
        await deleteUtente(id);
        setUtenti(await getAllUtenti());
    };

    const handleLoadTopUtenti = () => {
        if (utentiTop.length > 0) {
            setUtentiTop([]);
            return;
        }
        getTopUtentiUltimoMese()
            .then(setUtentiTop)
            .catch(console.error);
    };


    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-2xl">Utenti</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Crea, modifica e gestisci gli utenti registrati.
                            </p>
                        </div>

                        <Button
                            variant={utentiTop.length > 0 ? "outline" : "default"}
                            onClick={handleLoadTopUtenti}
                        >
                            {utentiTop.length > 0 ? "Nascondi Top 5 Utenti" : "Carica Top 5 Utenti"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {utentiTop.length > 0 && (
                        <Table className="mt-2 rounded-xl border bg-card/40 shadow-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Cognome</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Giorni prenotati</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {utentiTop.map((u, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{u.nome}</TableCell>
                                        <TableCell>{u.cognome}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{u.giorniPrenotati}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
                <UtenteForm
                    utenteSelezionato={utenteSelezionato}
                    onSave={handleSave}
                    onCancel={() => setUtenteSelezionato(null)}
                />

                <Card>
                    <CardContent>
                        <UtentiTable
                            utenti={utenti}
                            onEdit={setUtenteSelezionato}
                            onDelete={handleDelete}
                            onAddPrenotazione={(utenteId) => setPrenotazioneUtenteId(utenteId)}
                        />
                    </CardContent>
                </Card>
            </section>

            {prenotazioneUtenteId && (
                <Card>
                    <CardContent>
                        <PrenotazioneForm
                            utenteId={prenotazioneUtenteId}
                            onSuccess={() => {
                                setPrenotazioneUtenteId(null);
                                alert("Prenotazione creata con successo");
                            }}
                            onCancel={() => setPrenotazioneUtenteId(null)}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
