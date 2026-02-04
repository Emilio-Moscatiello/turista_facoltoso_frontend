import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
    { to: "/abitazioni", label: "Abitazioni" },
    { to: "/prenotazioni", label: "Prenotazioni" },
    { to: "/feedback", label: "Feedback" },
    { to: "/host", label: "Host" },
    { to: "/utenti", label: "Utenti" },
];

export default function MainLayout() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

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
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/60">
            {/* NAVBAR */}
            <header
                className={`fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:h-20 md:px-6">
                    {/* LOGO + TITOLO */}
                    <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
                        <img
                            src={logo}
                            alt="Turista per sempre"
                            className="h-8 w-auto md:h-12"
                        />
                        <div className="hidden flex-col text-left sm:flex">
                            <span className="text-sm font-semibold leading-tight md:text-base">
                                Turista per Sempre
                            </span>
                            <span className="text-[11px] text-muted-foreground md:text-xs">
                                Backoffice amministrazione
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="ml-auto hidden items-center gap-2 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const isActive = location.pathname.startsWith(item.to);
                            return (
                                <Button
                                    key={item.to}
                                    asChild
                                    variant={isActive ? "default" : "ghost"}
                                    size="sm"
                                >
                                    <Link to={item.to}>{item.label}</Link>
                                </Button>
                            );
                        })}
                    </nav>

                    {/* MOBILE NAV */}
                    <div className="ml-auto flex items-center justify-end md:hidden relative">
                        <button
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-sm"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Apri menu"
                        >
                            <span className="sr-only">Apri menu di navigazione</span>
                            <span className="flex flex-col gap-[3px]">
                                <span className="h-[2px] w-4 rounded-full bg-foreground" />
                                <span className="h-[2px] w-3 rounded-full bg-foreground" />
                                <span className="h-[2px] w-5 rounded-full bg-foreground" />
                            </span>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-border/70 bg-background/95 p-2 shadow-lg">
                                <nav className="flex flex-col gap-1">
                                    {NAV_ITEMS.map((item) => {
                                        const isActive = location.pathname.startsWith(item.to);
                                        return (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                onClick={closeMenu}
                                                className={`flex items-center rounded-lg px-3 py-2 text-sm ${isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* CONTENUTO */}
            <main className="px-4 pb-10 pt-24 md:px-6 md:pt-28">
                <div className="mx-auto max-w-6xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

