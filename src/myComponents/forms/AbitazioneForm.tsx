import { useState } from "react";

interface Props {
    onSave: (a: {
        nome: string;
        indirizzo: string;
        postiLetto: number;
        prezzo: number;
    }) => void;
}

export default function AbitazioneForm({ onSave }: Props) {
    const [form, setForm] = useState({
        nome: "",
        indirizzo: "",
        postiLetto: 1,
        prezzo: 0,
    });

    const handleSubmit = () => {
        if (!form.nome || !form.indirizzo) {
            alert("Nome e indirizzo sono obbligatori");
            return;
        }

        if (form.postiLetto <= 0) {
            alert("Il numero di posti letto deve essere maggiore di 0");
            return;
        }

        if (form.prezzo <= 0) {
            alert("Il prezzo deve essere maggiore di 0");
            return;
        }

        onSave(form);

        setForm({
            nome: "",
            indirizzo: "",
            postiLetto: 1,
            prezzo: 0,
        });
    };

    return (
        <div className="card bg-base-100 shadow p-4 mb-6">
            <h3 className="font-bold mb-4">Nuova abitazione</h3>

            <input
                className="input input-bordered w-full mb-3"
                placeholder="Nome abitazione"
                value={form.nome}
                onChange={(e) =>
                    setForm({ ...form, nome: e.target.value })
                }
            />

            <input
                className="input input-bordered w-full mb-3"
                placeholder="Indirizzo"
                value={form.indirizzo}
                onChange={(e) =>
                    setForm({ ...form, indirizzo: e.target.value })
                }
            />

            <input
                type="number"
                min={1}
                className="input input-bordered w-full mb-3"
                placeholder="Numero posti letto"
                value={form.postiLetto}
                onChange={(e) =>
                    setForm({
                        ...form,
                        postiLetto: Number(e.target.value),
                    })
                }
            />

            <input
                type="text"
                className="input input-bordered w-full mb-4"
                placeholder="Prezzo (€)"
                value={form.prezzo}
                onChange={(e) => {
                    const value = e.target.value.replace(",", ".");
                    if (!isNaN(Number(value))) {
                        setForm({
                            ...form,
                            prezzo: Number(value),
                        });
                    }
                }}
            />


            <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Salva
            </button>
        </div>
    );
}
