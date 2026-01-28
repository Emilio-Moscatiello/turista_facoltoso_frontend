const BASE_URL = "http://localhost:7000";


export async function getAbitazioniByCodiceHost(codiceHost) {
    const response = await fetch(
        `${BASE_URL}/abitazioni/host/${codiceHost}`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero delle abitazioni");
    }

    return response.json();
}


export async function getUltimaPrenotazioneUtente(utenteId) {
    const response = await fetch(
        `${BASE_URL}/prenotazioni/ultima/${utenteId}`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dell'ultima prenotazione");
    }

    return response.json();
}

export async function getAbitazionePiuGettonata() {
    const response = await fetch(
        `${BASE_URL}/abitazioni/piu-gettonata`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dell'abitazione più gettonata");
    }

    return response.json();
}


export async function getHostTopUltimoMese() {
    const response = await fetch(
        `${BASE_URL}/host/top-ultimo-mese`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero degli host");
    }

    return response.json();
}


export async function getSuperHost() {
    const response = await fetch(
        `${BASE_URL}/host/super-host`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero dei super host");
    }

    return response.json();
}

export async function getTopUtentiUltimoMese() {
    const response = await fetch(
        `${BASE_URL}/utenti/top-5-giorni-ultimo-mese`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero degli utenti");
    }

    return response.json();
}

export async function getMediaPostiLetto() {
    const response = await fetch(
        `${BASE_URL}/abitazioni/media-posti-letto`
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero della media posti letto");
    }

    return response.json();
}
