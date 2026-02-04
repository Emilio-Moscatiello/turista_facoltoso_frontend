import type { Host } from "../../models/dto";
import { useNavigate } from "react-router-dom";
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
    host: Host[];
    onEdit: (h: Host) => void;
    onDelete: (id: string) => void;
}

export default function HostTable({ host, onEdit, onDelete }: Props) {
    const navigate = useNavigate();
    if (host.length === 0) return null;

    return (
        <Table className="rounded-xl border bg-card/40 shadow-sm">
            <TableHeader>
                <TableRow>
                    <TableHead>Utente ID</TableHead>
                    <TableHead>Codice Host</TableHead>
                    <TableHead className="w-56 text-right">Azioni</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {host.map((h) => (
                    <TableRow key={h.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                            {h.utenteId}
                        </TableCell>
                        <TableCell>{h.codiceHost}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap justify-end gap-2">
                                <Button
                                    size="xs"
                                    variant="secondary"
                                    onClick={() => navigate(`/host/${h.id}/abitazioni`)}
                                >
                                    Gestisci abitazioni
                                </Button>
                                <Button
                                    size="xs"
                                    variant="outline"
                                    onClick={() => onEdit(h)}
                                >
                                    Modifica
                                </Button>
                                <Button
                                    size="xs"
                                    variant="destructive"
                                    onClick={() => onDelete(h.id!)}
                                >
                                    Elimina
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
