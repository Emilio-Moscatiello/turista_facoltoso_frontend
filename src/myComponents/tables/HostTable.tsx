import type { Host } from "../../models/dto";

interface Props {
    host: Host[];
    onEdit: (h: Host) => void;
    onDelete: (id: string) => void;
}

export default function HostTable({ host, onEdit, onDelete }: Props) {
    if (host.length === 0) return null;

    return (
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th>Utente ID</th>
                    <th>Codice Host</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {host.map((h) => (
                    <tr key={h.id}>
                        <td>{h.utenteId}</td>
                        <td>{h.codiceHost}</td>
                        <td className="flex gap-2">
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={() => onEdit(h)}
                            >
                                Modifica
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => onDelete(h.id!)}
                            >
                                Elimina
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
