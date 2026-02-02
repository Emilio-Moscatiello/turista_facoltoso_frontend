import { useEffect, useState } from "react";
import {
    getAllHost,
    createHost,
    updateHost,
    deleteHost,
    getHostTopUltimoMese,
    getSuperHost,
} from "../api/backend";
import type { Host } from "../models/dto";
import HostForm from "../myComponents/forms/HostForm";
import HostTable from "../myComponents/tables/HostTable";

export default function HostPage() {
    const [superHost, setSuperHost] = useState<any[]>([]);
    const [topHost, setTopHost] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [host, setHost] = useState<Host[]>([]);
    const [hostSelezionato, setHostSelezionato] = useState<Host | null>(null);

    useEffect(() => {
        getAllHost().then(setHost);
    }, []);


    const handleLoadSuperHost = async () => {
        setLoading(true);
        setError(null);
        setSuperHost([]);

        try {
            const data = await getSuperHost();
            setSuperHost(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoadTopHost = async () => {
        setLoading(true);
        setError(null);
        setTopHost([]);

        try {
            const data = await getHostTopUltimoMese();
            setTopHost(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto");
            }
        } finally {
            setLoading(false);
        }


    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Gestione Host</h1>

            <div className="flex gap-4 mb-6">
                <button className="btn btn-success" onClick={handleLoadSuperHost}>
                    Carica Super Host
                </button>

                <button className="btn btn-success" onClick={handleLoadTopHost}>
                    Carica Host Top Ultimo Mese
                </button>
            </div>

            {loading && <p className="text-info">Caricamento...</p>}
            {error && <p className="text-error">{error}</p>}

            {/* super host */}
            {superHost.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Super Host</h2>

                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Codice Host</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Prenotazioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {superHost.map((host, index) => (
                                <tr key={index}>
                                    <td>{host.codiceHost}</td>
                                    <td>{host.nome}</td>
                                    <td>{host.cognome}</td>
                                    <td>{host.numeroPrenotazioni}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* top host */}
            {topHost.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        Host con più prenotazioni (ultimo mese)
                    </h2>

                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Codice Host</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Prenotazioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topHost.map((host, index) => (
                                <tr key={index}>
                                    <td>{host.codiceHost}</td>
                                    <td>{host.nome}</td>
                                    <td>{host.cognome}</td>
                                    <td>{host.numeroPrenotazioni}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <hr className="my-10" />

            <h2 className="text-2xl font-semibold mb-4">Aggiungi Host</h2>

            <HostForm
                hostSelezionato={hostSelezionato}
                onSave={async (host) => {
                    if (host.id) {
                        await updateHost(host.id, host);
                    } else {
                        await createHost(host);
                    }
                    setHostSelezionato(null);
                    setHost(await getAllHost());
                }}
                onCancel={() => setHostSelezionato(null)}
            />

            <HostTable
                host={host}
                onEdit={setHostSelezionato}
                onDelete={async (id) => {
                    await deleteHost(id);
                    setHost(await getAllHost());
                }}
            />

        </div>


    );
}
