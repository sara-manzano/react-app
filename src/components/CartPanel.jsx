import formatPrice from '../utils/formatPrice'

function CartPanel({
  cartItems,
  checkoutForm,
  checkoutStatus,
  onCheckoutChange,
  onCheckoutSubmit,
  onDecrease,
  onIncrease,
  onRemove,
  subtotal,
}) {
  const shipping = cartItems.length > 0 ? 12 : 0
  const total = subtotal + shipping

  return (
    <div className="checkout-layout">
      <div className="cart-card fade-in">
        <h3>Tu pedido</h3>

        {cartItems.length > 0 ? (
          <div className="cart-list">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item__body">
                  <div className="cart-item__top">
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.brand}</p>
                    </div>
                    <strong>{formatPrice(item.price)}</strong>
                  </div>

                  <div className="cart-item__actions">
                    <div className="quantity-group">
                      <button type="button" className="quantity-button" onClick={() => onDecrease(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" className="quantity-button" onClick={() => onIncrease(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <button type="button" className="favorite-button" onClick={() => onRemove(item.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-card empty-card--inline">
            <h3>Aún no agregas productos</h3>
            <p>Cuando elijas algo del catálogo, aparecerá aquí.</p>
          </div>
        )}
      </div>

      <div className="checkout-card fade-in">
        <h3>Finalizar pedido</h3>
        <div className="checkout-summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div>
            <span>Envío</span>
            <strong>{formatPrice(shipping)}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>

        <form className="checkout-form" onSubmit={onCheckoutSubmit}>
          <label>
            Nombre
            <input
              type="text"
              required
              value={checkoutForm.name}
              onChange={(event) => onCheckoutChange('name', event.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              value={checkoutForm.email}
              onChange={(event) => onCheckoutChange('email', event.target.value)}
            />
          </label>

          <label>
            Dirección
            <input
              type="text"
              required
              value={checkoutForm.address}
              onChange={(event) => onCheckoutChange('address', event.target.value)}
            />
          </label>

          <label>
            Notas del pedido
            <textarea
              rows="4"
              value={checkoutForm.notes}
              onChange={(event) => onCheckoutChange('notes', event.target.value)}
            />
          </label>

          <button type="submit" className="primary-button">
            Confirmar compra
          </button>
        </form>

        {checkoutStatus === 'success' && (
          <p className="feedback-message">Listo. Tu pedido quedó registrado y el carrito volvió a cero.</p>
        )}

        {checkoutStatus === 'empty' && (
          <p className="feedback-message">Primero agrega al menos un producto antes de confirmar.</p>
        )}
      </div>
    </div>
  )
}

export default CartPanel