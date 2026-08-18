import formatPrice from '../utils/formatPrice'

function ProductCard({ isFavorite, onAddToCart, onToggleFavorite, product }) {
  const productImage = product.images?.[0] ?? product.thumbnail

  return (
    <article className="product-card fade-in">
      <img src={productImage} alt={product.title} />

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-pill">{product.brand}</span>
          <span className="product-pill">{product.cosmeticLabel}</span>
          <span className="product-pill">{product.rating} / 5</span>
        </div>

        <div className="product-card__content">
          <h3>{product.title}</h3>
          <p className="product-card__description">{product.description}</p>
        </div>

        <strong className="product-price">{formatPrice(product.price)}</strong>

        <div className="product-card__actions">
          <button type="button" className="primary-button" onClick={() => onAddToCart(product)}>
            Añadir al carrito
          </button>
          <button
            type="button"
            className={`favorite-button${isFavorite ? ' is-active' : ''}`}
            onClick={() => onToggleFavorite(product.id)}
          >
            {isFavorite ? 'Quitar' : 'Guardar'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard