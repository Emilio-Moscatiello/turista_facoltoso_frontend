import { useState, useEffect } from "react";
import type { Utente } from "../../models/dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Card className="mt-2">
            <CardHeader>
                <CardTitle className="text-xl">
                    {utente.id ? "Modifica utente" : "Nuovo utente"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["nome", "cognome", "email", "indirizzo"].map((field) => (
                        <div key={field} className="space-y-1.5">
                            <Label htmlFor={field} className="capitalize">
                                {field}
                            </Label>
                            <Input
                                id={field}
                                name={field}
                                value={(utente as any)[field]}
                                onChange={handleChange}
                                placeholder={field}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    <Button onClick={handleSubmit}>Salva</Button>
                    <Button variant="ghost" type="button" onClick={onCancel}>
                        Annulla
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
