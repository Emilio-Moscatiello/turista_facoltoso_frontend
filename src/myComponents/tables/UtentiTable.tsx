import type { Utente } from "../../models/dto";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
    utenti: Utente[];
    onEdit: (u: Utente) => void;
    onDelete: (id: string) => void;
    onAddPrenotazione: (utenteId: string) => void;
}

export default function UtentiTable({
    utenti,
    onEdit,
    onDelete,
    onAddPrenotazione,
}: Props) {
    if (utenti.length === 0) return null;

    return (
        <Table className="rounded-xl border bg-card/40 shadow-sm">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-32">ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cognome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Indirizzo</TableHead>
                    <TableHead className="w-48 text-right">Azioni</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {utenti.map((u) => (
                    <TableRow key={u.id}>
                        <TableCell
                            className="cursor-pointer font-mono text-xs text-muted-foreground"
                            title="Clicca per copiare"
                            onClick={() => navigator.clipboard.writeText(u.id)}
                        >
                            {u.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell>{u.nome}</TableCell>
                        <TableCell>{u.cognome}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.indirizzo}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap justify-end gap-2">
                                <Button
                                    size="xs"
                                    variant="outline"
                                    onClick={() => onEdit(u)}
                                >
                                    Modifica
                                </Button>
                                <Button
                                    size="xs"
                                    variant="destructive"
                                    onClick={() => onDelete(u.id)}
                                >
                                    Elimina
                                </Button>
                                <Button
                                    size="xs"
                                    variant="secondary"
                                    onClick={() => onAddPrenotazione(u.id)}
                                >
                                    Aggiungi prenotazione
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
