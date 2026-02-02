import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function MainLayout() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="min-h-screen bg-base-200">
            {/* NAVBAR */}
            <div
                className={`fixed top-0 z-50 w-full transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="navbar min-h-[64px] bg-base-100/80 backdrop-blur-md shadow px-4">
                    {/* LOGO */}
                    <div className="flex items-center flex-1">
                        <Link to="/" className="btn btn-ghost px-0">
                            <img
                                src={logo}
                                alt="Turista per sempre"
                                className="h-10 md:h-36 w-auto"
                            />
                        </Link>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex gap-2">
                        <Link className="btn btn-ghost" to="/abitazioni">
                            Abitazioni
                        </Link>
                        <Link className="btn btn-ghost" to="/prenotazioni">
                            Prenotazioni
                        </Link>
                        <Link className="btn btn-ghost" to="/host">
                            Host
                        </Link>
                        <Link className="btn btn-ghost" to="/utenti">
                            Utenti
                        </Link>
                    </div>

                    {/* MOBILE HAMBURGER */}
                    <div className="md:hidden relative">
                        <button
                            className="btn btn-ghost text-2xl"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                        >
                            ☰
                        </button>

                        {menuOpen && (
                            <ul className="absolute right-0 top-12 menu menu-sm bg-base-100 shadow rounded-box w-52 p-2 gap-1">
                                <li>
                                    <Link to="/abitazioni" onClick={closeMenu}>
                                        Abitazioni
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/prenotazioni" onClick={closeMenu}>
                                        Prenotazioni
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/host" onClick={closeMenu}>
                                        Host
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/utenti" onClick={closeMenu}>
                                        Utenti
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENUTO */}
            <main className="pt-24 p-6">
                <Outlet />
            </main>
        </div>
    );
}
