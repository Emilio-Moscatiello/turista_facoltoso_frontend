import type { Abitazione } from "../../models/dto";

interface AbitazioniTableProps {
    abitazioni: Abitazione[];
}

export default function AbitazioniTable({
    abitazioni,
}: AbitazioniTableProps) {
    if (abitazioni.length === 0) {
        return null;
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
                    </tr>
                </thead>
                <tbody>
                    {abitazioni.map((a) => (
                        <tr key={a.id}>
                            <td>{a.nome}</td>
                            <td>{a.indirizzo}</td>
                            <td>{a.postiLetto}</td>
                            <td>{a.prezzo} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
