import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useShop } from "../context/useShop";

const ANNOUNCEMENTS = [
  "Envio gratis desde 3 EUR",
  "3x2 en maquillaje seleccionado",
  "Codigo FLASH10 para un 10% extra hoy",
];

function Layout() {
  const { cartCount, favorites } = useShop();
  const favoritesCount = favorites.length;
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setAnnouncementIndex(
        (currentIndex) => (currentIndex + 1) % ANNOUNCEMENTS.length,
      );
    }, 3200);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className="app-shell">
      <div className="promo-strip" aria-live="polite">
        <p>{ANNOUNCEMENTS[announcementIndex]}</p>
      </div>
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink className="topbar__brand" to="/">
            <span className="topbar__brand-mark">S</span>
            <span>SkinScent</span>
          </NavLink>
          <nav className="topbar__nav">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/favoritos">Favoritos ({favoritesCount})</NavLink>
            <NavLink to="/pedido">Pedido ({cartCount})</NavLink>
            <NavLink to="/carrito">Carrito ({cartCount})</NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
