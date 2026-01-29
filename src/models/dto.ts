export interface Abitazione {
  id: string;
  nome: string;
  indirizzo: string;
  postiLetto: number;
  prezzo: number;
}

export interface AbitazioneGettonata {
  nome: string;
  indirizzo: string;
  numeroPrenotazioni: number;
}
