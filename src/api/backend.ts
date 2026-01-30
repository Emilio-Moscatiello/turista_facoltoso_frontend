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

export async function getMediaPostiLetto() {
    const response = await fetch(
        "http://localhost:7000/abitazioni/media-posti-letto"
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero della media posti letto");
    }

    return response.json();
}

export async function getUtenti() {
    const res = await fetch(`${BASE_URL}/utenti`);
    if (!res.ok) throw new Error("Errore nel recupero utenti");
    return res.json();
}

export async function getAllUtenti() {
    const res = await fetch(`${BASE_URL}/utenti`);
    if (!res.ok) throw new Error("Errore caricamento utenti");
    return res.json();
}

export async function createUtente(utente: any) {
    const res = await fetch(`${BASE_URL}/utenti`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utente),
    });

    if (!res.ok) throw new Error("Errore creazione utente");
    return res.json();
}

export async function updateUtente(id: string, utente: any) {
    const res = await fetch(`${BASE_URL}/utenti/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utente),
    });

    if (!res.ok) throw new Error("Errore aggiornamento utente");
    return res.json();
}

export async function deleteUtente(id: string) {
    const res = await fetch(`${BASE_URL}/utenti/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Errore eliminazione utente");
}

export async function createPrenotazioneForUtente(
    utenteId: string,
    prenotazione: {
        abitazioneId: string;
        dataInizio: string;
        dataFine: string;
    }
) {
    const response = await fetch(
        `${BASE_URL}/utenti/${utenteId}/prenotazioni`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prenotazione),
        }
    );

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg);
    }

    return response.json();

}

export async function getAbitazioni() {
    const response = await fetch(`${BASE_URL}/abitazioni`);

    if (!response.ok) {
        throw new Error("Errore nel recupero delle abitazioni");
    }

    return response.json();
}


// === HOST CRUD ===

export async function getAllHost() {
    const res = await fetch("http://localhost:7000/host");
    if (!res.ok) throw new Error("Errore caricamento host");
    return res.json();
}

export async function createHost(host: any) {
    const res = await fetch("http://localhost:7000/host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(host),
    });

    if (!res.ok) throw new Error("Errore creazione host");
    return res.json();
}

export async function updateHost(id: string, host: any) {
    const res = await fetch(`http://localhost:7000/host/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(host),
    });

    if (!res.ok) throw new Error("Errore aggiornamento host");
    return res.json();
}

export async function deleteHost(id: string) {
    const res = await fetch(`http://localhost:7000/host/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Errore eliminazione host");
}





