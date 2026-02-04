import { useEffect, useState } from "react";
import type { Host } from "../../models/dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    hostSelezionato: Host | null;
    onSave: (host: Host) => void;
    onCancel: () => void;
}

export default function HostForm({
    hostSelezionato,
    onSave,
    onCancel,
}: Props) {
    const [host, setHost] = useState<Host>({
        utenteId: "",
        codiceHost: "",
    });

    useEffect(() => {
        if (hostSelezionato) {
            setHost(hostSelezionato);
        }
    }, [hostSelezionato]);

    const handleSubmit = () => {
        onSave(host);
        setHost({ utenteId: "", codiceHost: "" });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-xl">
                    {hostSelezionato ? "Modifica host" : "Nuovo host"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="utenteId">ID utente</Label>
                        <Input
                            id="utenteId"
                            placeholder="ID Utente"
                            value={host.utenteId}
                            onChange={(e) =>
                                setHost({ ...host, utenteId: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="codiceHost">Codice host</Label>
                        <Input
                            id="codiceHost"
                            placeholder="Codice Host (es. HOST001)"
                            value={host.codiceHost}
                            onChange={(e) =>
                                setHost({ ...host, codiceHost: e.target.value })
                            }
                        />
                    </div>
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
