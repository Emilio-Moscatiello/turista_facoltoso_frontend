import type { Abitazione } from "../../models/dto";

interface AbitazioniTableProps {
    abitazioni: Abitazione[];
    onDelete: (abitazioneId: string) => void;
}

export default function AbitazioniTable({
    abitazioni,
    onDelete,
}: AbitazioniTableProps) {
    if (abitazioni.length === 0) {
        return <p className="text-gray-500 mt-4">Nessuna abitazione presente</p>;
    }

    return (
        <div className="overflow-x-auto mt-4">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Indirizzo</th>
                        <th>Posti letto</th>
                        <th>Prezzo</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {abitazioni.map((a) => (
                        <tr key={a.id}>
                            <td>{a.nome}</td>
                            <td>{a.indirizzo}</td>
                            <td>{a.postiLetto}</td>
                            <td>{a.prezzo} €</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => onDelete(a.id)}
                                >
                                    Elimina
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
