import { useState, useEffect } from "react";
import type { Utente } from "../../models/dto";

interface Props {
    utenteSelezionato?: Utente | null;
    onSave: (utente: Utente) => void;
    onCancel: () => void;
}

export default function UtenteForm({ utenteSelezionato, onSave, onCancel }: Props) {
    const [utente, setUtente] = useState<Utente>({
        id: "",
        nome: "",
        cognome: "",
        email: "",
        indirizzo: "",
    });

    useEffect(() => {
        if (utenteSelezionato) setUtente(utenteSelezionato);
    }, [utenteSelezionato]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUtente({ ...utente, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(utente);
        setUtente({ id: "", nome: "", cognome: "", email: "", indirizzo: "" });
    };

    return (
        <div className="card bg-base-100 shadow p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">
                {utente.id ? "Modifica Utente" : "Nuovo Utente"}
            </h2>

            {["nome", "cognome", "email", "indirizzo"].map((field) => (
                <input
                    key={field}
                    name={field}
                    value={(utente as any)[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="input input-bordered w-full mb-2"
                />
            ))}

            <div className="flex gap-2 mt-4">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Salva
                </button>
                <button className="btn btn-error" onClick={onCancel}>
                    Annulla
                </button>
            </div>
        </div>
    );
}
