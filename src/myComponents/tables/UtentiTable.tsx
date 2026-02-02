import type { Utente } from "../../models/dto";

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
        <table className="table table-zebra mt-6">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Email</th>
                    <th>Indirizzo</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {utenti.map((u) => (
                    <tr key={u.id}>
                        <td
                            className="font-mono text-xs cursor-pointer"
                            title="Clicca per copiare"
                            onClick={() => navigator.clipboard.writeText(u.id)}
                        >
                            {u.id.slice(0, 8)}…
                        </td>

                        <td>{u.nome}</td>
                        <td>{u.cognome}</td>
                        <td>{u.email}</td>
                        <td>{u.indirizzo}</td>

                        <td className="flex gap-2">
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={() => onEdit(u)}
                            >
                                Modifica
                            </button>

                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => onDelete(u.id)}
                            >
                                Elimina
                            </button>

                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => onAddPrenotazione(u.id)}
                            >
                                Aggiungi prenotazione
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
