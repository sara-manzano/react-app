import { NavLink, Outlet } from 'react-router-dom'
import { useShop } from '../context/useShop'

function Layout() {
  const { cartCount, favorites } = useShop()
  const favoritesCount = favorites.length

  return (
    <div className="app-shell">
      <div className="promo-strip">
        <p>Envio desde 24/48h · Ofertas en maquillaje, skincare y fragancias</p>
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
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default Layout