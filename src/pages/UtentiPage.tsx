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

export default function UtentiPage() {

    const [utentiTop, setUtentiTop] = useState<any[]>([]);


    const [utenti, setUtenti] = useState<Utente[]>([]);
    const [utenteSelezionato, setUtenteSelezionato] = useState<Utente | null>(null);

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

    const handleLoadTopUtenti = async () => {
        console.log("CHIAMATA TOP 5");

        try {
            const data = await getTopUtentiUltimoMese();
            console.log("RISPOSTA TOP 5:", data);
            setUtentiTop(data);
        } catch (err) {
            console.error("Errore caricamento top utenti", err);
        }
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Utenti</h1>

            <button
                className="btn btn-primary mb-4"
                onClick={() => {
                    console.log("CLICK TOP 5");
                    handleLoadTopUtenti();
                }}
            >
                Carica Top 5 Utenti
            </button>

            {utentiTop.length > 0 && (
                <table className="table table-zebra mb-8">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Giorni prenotati</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utentiTop.map((u, index) => (
                            <tr key={index}>
                                <td>{u.nome}</td>
                                <td>{u.cognome}</td>
                                <td>{u.email}</td>
                                <td>{u.giorniPrenotati}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <UtenteForm
                utenteSelezionato={utenteSelezionato}
                onSave={handleSave}
                onCancel={() => setUtenteSelezionato(null)}
            />

            <UtentiTable
                utenti={utenti}
                onEdit={setUtenteSelezionato}
                onDelete={handleDelete}
            />
        </div>
    );
}
