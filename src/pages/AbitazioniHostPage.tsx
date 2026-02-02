import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getAbitazioniByHostId,
    createAbitazioneForHost,
    deleteAbitazioneForHost,
} from "../api/backend";
import type { Abitazione } from "../models/dto";
import AbitazioniTable from "../myComponents/tables/AbitazioniTable";
import AbitazioneForm from "../myComponents/forms/AbitazioneForm";

export default function AbitazioniHostPage() {
    const { hostId } = useParams<{ hostId: string }>();

    const [abitazioni, setAbitazioni] = useState<Abitazione[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAbitazioni = async () => {
        if (!hostId) return;

        setLoading(true);
        try {
            const data = await getAbitazioniByHostId(hostId);
            setAbitazioni(data);
        } catch (e) {
            setError("Errore caricamento abitazioni");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAbitazioni();
    }, [hostId]);

    const handleCreate = async (abitazione: Omit<Abitazione, "id">) => {
        if (!hostId) return;

        await createAbitazioneForHost(hostId, abitazione);
        await loadAbitazioni();
    };

    const handleDelete = async (abitazioneId: string) => {
        if (!hostId) return;

        await deleteAbitazioneForHost(hostId, abitazioneId);
        await loadAbitazioni();
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">
                Gestione abitazioni
            </h1>

            {error && <p className="text-error">{error}</p>}
            {loading && <p className="text-info">Caricamento...</p>}

            <AbitazioneForm onSave={handleCreate} />

            <AbitazioniTable
                abitazioni={abitazioni}
                onDelete={handleDelete}
            />
        </div>
    );
}
