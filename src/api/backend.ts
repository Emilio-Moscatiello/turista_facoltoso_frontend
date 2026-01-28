const BASE_URL = "http://localhost:7000";

export async function getAbitazioniByCodiceHost(
    codiceHost: string
): Promise<any[]> {
    const response = await fetch(
        `${BASE_URL}/abitazioni/host/${codiceHost}`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero delle abitazioni");
    }

    return response.json();
}

export async function getUltimaPrenotazioneUtente(
    utenteId: string
): Promise<any> {
    const response = await fetch(
        `${BASE_URL}/prenotazioni/ultima/${utenteId}`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dell'ultima prenotazione");
    }

    return response.json();
}

export async function getAbitazionePiuGettonata(): Promise<any> {
    const response = await fetch(
        `${BASE_URL}/abitazioni/piu-gettonata`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dell'abitazione più gettonata");
    }

    return response.json();
}

export async function getHostTopUltimoMese(): Promise<any[]> {
    const response = await fetch(
        `${BASE_URL}/host/top-ultimo-mese`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero degli host");
    }

    return response.json();
}

export async function getSuperHost(): Promise<any[]> {
    const response = await fetch(
        `${BASE_URL}/host/super-host`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dei super host");
    }

    return response.json();
}

export async function getTopUtentiUltimoMese(): Promise<any[]> {
    const response = await fetch(
        `${BASE_URL}/utenti/top-5-giorni-ultimo-mese`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero degli utenti");
    }

    return response.json();
}

export async function getMediaPostiLetto(): Promise<number> {
    const response = await fetch(
        `${BASE_URL}/abitazioni/media-posti-letto`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero della media posti letto");
    }

    return response.json();
}
