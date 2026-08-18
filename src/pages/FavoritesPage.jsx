import ProductCard from '../components/ProductCard'
import { useShop } from '../context/useShop'

function FavoritesPage({ products }) {
  const { addToCart, favorites, toggleFavorite } = useShop()
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))
  const hasFavorites = favoriteProducts.length > 0

  return (
    <main className="page-shell page-shell--route">
      <section className="section-block">
        <div className="section-heading fade-in">
          <div>
            <p className="section-heading__eyebrow">Favoritos</p>
            <h2>Los productos que guardaste para volver a mirar con calma.</h2>
          </div>
        </div>

        {hasFavorites ? (
          <div className="product-grid">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                isFavorite={favorites.includes(product.id)}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="empty-card fade-in">
            <h3>Todavia no guardas favoritos</h3>
            <p>Marca algunos productos desde el inicio y apareceran aqui.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default FavoritesPage