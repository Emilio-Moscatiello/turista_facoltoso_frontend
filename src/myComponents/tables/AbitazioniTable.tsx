import type { Abitazione } from "../../models/dto";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface AbitazioniTableProps {
    abitazioni: Abitazione[];
    onDelete?: (abitazioneId: string) => void;
    onAddPrenotazione?: (abitazione: Abitazione) => void;
}

export default function AbitazioniTable({
    abitazioni,
    onDelete,
    onAddPrenotazione,
}: AbitazioniTableProps) {
    if (abitazioni.length === 0) {
        return (
            <p className="mt-4 text-sm text-muted-foreground">
                Nessuna abitazione presente.
            </p>
        );
    }

    return (
        <div className="mt-4">
            <Table className="rounded-xl border bg-card/40 shadow-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Indirizzo</TableHead>
                        <TableHead>Posti letto</TableHead>
                        <TableHead>Prezzo</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {abitazioni.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell>{a.nome}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {a.indirizzo}
                            </TableCell>
                            <TableCell>{a.postiLetto}</TableCell>
                            <TableCell>{a.prezzo} €</TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    {onAddPrenotazione && (
                                        <Button
                                            size="xs"
                                            variant="secondary"
                                            onClick={() => onAddPrenotazione(a)}
                                        >
                                            Aggiungi prenotazione
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            size="xs"
                                            variant="destructive"
                                            onClick={() => onDelete(a.id)}
                                        >
                                            Elimina
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
