import ContactSection from '../components/ContactSection'
import FilterBar from '../components/FilterBar'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import { useShop } from '../context/useShop'
import formatPrice from '../utils/formatPrice'

function HomePage(props) {
  const {
    errorMessage,
    featuredProducts,
    filteredProducts,
    onCategoryChange,
    onSearchChange,
    onSortChange,
    searchTerm,
    selectedCategory,
    sortValue,
    status,
  } = props

  const {
    addToCart,
    contactForm,
    contactStatus,
    favorites,
    handleContactChange,
    handleContactSubmit,
    toggleFavorite,
  } = useShop()

  let statusTitle = ''
  let statusText = ''

  if (status === 'loading') {
    statusTitle = 'Cargando productos'
    statusText = 'Estamos preparando la vitrina.'
  }

  if (status === 'success') {
    statusTitle = 'Coleccion disponible'
    statusText = `Hay ${filteredProducts.length} productos listos para ver.`
  }

  if (status === 'error') {
    statusTitle = 'No pudimos cargar la coleccion'
    statusText = errorMessage
  }

  return (
    <>
      <HeroSection />

      <main className="page-shell">
        <section className="section-block section-block--catalog" id="catalogo">
          <FilterBar
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortValue={sortValue}
            onSearchChange={onSearchChange}
            onCategoryChange={onCategoryChange}
            onSortChange={onSortChange}
          />

          <div className="section-heading fade-in">
            <div>
              <p className="section-heading__eyebrow">Catalogo</p>
              <h2>Compra por tipo de producto y filtra como en una tienda real</h2>
            </div>
          </div>

          <div className="status-banner fade-in">
            <span className={`status-dot${status === 'success' ? ' is-live' : ''}${status === 'error' ? ' is-error' : ''}`}></span>
            <div>
              <strong>{statusTitle}</strong>
              <p>{statusText}</p>
            </div>
          </div>

          {status === 'success' && filteredProducts.length > 0 && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  isFavorite={favorites.includes(product.id)}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  product={product}
                />
              ))}
            </div>
          )}

          {status === 'success' && filteredProducts.length === 0 && (
            <div className="empty-card fade-in">
              <h3>No hay resultados para esa busqueda</h3>
              <p>Prueba con otra palabra o cambia la categoria para ver mas opciones.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="empty-card fade-in">
              <h3>No pudimos mostrar la coleccion</h3>
              <p>{errorMessage}</p>
            </div>
          )}
        </section>

        <section className="section-block section-block--featured" id="destacados">
          <div className="section-heading fade-in">
            <div>
              <p className="section-heading__eyebrow">Mas vendidos</p>
              <h2>Una selección rápida para entrar, comparar y comprar.</h2>
            </div>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <article className="featured-card fade-in" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div className="featured-card__content">
                  <p>{product.cosmeticLabel}</p>
                  <h3>{product.title}</h3>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactSection
          contactForm={contactForm}
          contactStatus={contactStatus}
          onContactChange={handleContactChange}
          onContactSubmit={handleContactSubmit}
        />
      </main>
    </>
  )
}

export default HomePage