import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Nuova abitazione
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="nome">Nome abitazione</Label>
                        <Input
                            id="nome"
                            placeholder="Nome abitazione"
                            value={form.nome}
                            onChange={(e) =>
                                setForm({ ...form, nome: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="indirizzo">Indirizzo</Label>
                        <Input
                            id="indirizzo"
                            placeholder="Indirizzo"
                            value={form.indirizzo}
                            onChange={(e) =>
                                setForm({ ...form, indirizzo: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="postiLetto">Numero posti letto</Label>
                        <Input
                            id="postiLetto"
                            type="number"
                            min={1}
                            placeholder="Numero posti letto"
                            value={form.postiLetto}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    postiLetto: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="prezzo">Prezzo (€)</Label>
                        <Input
                            id="prezzo"
                            type="text"
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
                    </div>
                </div>

                <Button className="mt-2 w-full" onClick={handleSubmit}>
                    Salva
                </Button>
            </CardContent>
        </Card>
    );
}
