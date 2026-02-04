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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl">
                            Gestione abitazioni
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Crea e gestisci le abitazioni associate a questo host.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {loading && (
                        <p className="text-sm text-muted-foreground">Caricamento...</p>
                    )}
                </CardContent>
            </Card>

            <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)]">
                <AbitazioneForm onSave={handleCreate} />

                <Card>
                    <CardContent>
                        <AbitazioniTable
                            abitazioni={abitazioni}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
