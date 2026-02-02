import { useEffect, useState } from "react";
import type { Host } from "../../models/dto";

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
        <div className="card bg-base-100 shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">
                {hostSelezionato ? "Modifica Host" : "Nuovo Host"}
            </h2>

            <input
                className="input input-bordered w-full mb-2"
                placeholder="ID Utente"
                value={host.utenteId}
                onChange={(e) =>
                    setHost({ ...host, utenteId: e.target.value })
                }
            />

            <input
                className="input input-bordered w-full mb-4"
                placeholder="Codice Host (es. HOST001)"
                value={host.codiceHost}
                onChange={(e) =>
                    setHost({ ...host, codiceHost: e.target.value })
                }
            />

            <div className="flex gap-2">
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
