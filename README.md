# SkinScent

Landing page de cosmetica construida con Vite y React. El proyecto combina una vitrina editorial con catalogo real, favoritos, carrito persistente, checkout simulado y formulario de contacto o reserva.

## Funcionalidades

- Catalogo real consumido desde la API publica de DummyJSON.
- Filtros por busqueda, categoria y orden.
- Favoritos persistidos en localStorage.
- Carrito de compra con control de cantidades.
- Checkout simulado dentro de la misma pagina.
- Formulario de contacto y reserva controlado por React.
- Diseno responsive con secciones editoriales para cosmetica.

## Stack

- React 19
- Vite 8
- CSS puro

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Estructura principal

- `src/App.jsx`: estado global de la pagina, carga de API, favoritos, carrito y formularios.
- `src/components/HeroSection.jsx`: portada principal.
- `src/components/FilterBar.jsx`: filtros de catalogo.
- `src/components/ProductCard.jsx`: tarjeta de producto.
- `src/components/CartPanel.jsx`: carrito y checkout.
- `src/components/ContactSection.jsx`: formulario de contacto y reserva.

## Validacion

El proyecto fue validado con:

```bash
npm run build
npm run lint
```
