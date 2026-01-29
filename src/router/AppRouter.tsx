import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import AbitazioniPage from "../pages/AbitazioniPage";
import PrenotazioniPage from "../pages/PrenotazioniPage";
import HostPage from "../pages/HostPage";
import UtentiPage from "../pages/UtentiPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to="/abitazioni" />} />
                    <Route path="/abitazioni" element={<AbitazioniPage />} />
                    <Route path="/prenotazioni" element={<PrenotazioniPage />} />
                    <Route path="/host" element={<HostPage />} />
                    <Route path="/utenti" element={<UtentiPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
