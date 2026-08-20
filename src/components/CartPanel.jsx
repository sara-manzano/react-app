import formatPrice from "../utils/formatPrice";

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
  const shipping = cartItems.length > 0 ? 12 : 0;
  const total = subtotal + shipping;
  const isCartEmpty = cartItems.length === 0;
  const isSubmitting = checkoutStatus === "submitting";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onCheckoutChange(name, value);
  };

  return (
    <div className="checkout-layout">
      <div className="cart-card fade-in">
        <h3>Tu pedido</h3>

        {!isCartEmpty ? (
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
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>

                  <div className="cart-item__actions">
                    <div className="quantity-group">
                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => onDecrease(item.id, 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => onIncrease(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemove(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-card empty-card--inline">
            <h3>Aún no has agregado productos</h3>
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
              name="name"
              value={checkoutForm.name}
              onChange={handleInputChange}
              disabled={isSubmitting || isCartEmpty}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              required
              name="email"
              value={checkoutForm.email}
              onChange={handleInputChange}
              disabled={isSubmitting || isCartEmpty}
            />
          </label>

          <label>
            Dirección
            <input
              type="text"
              required
              name="address"
              value={checkoutForm.address}
              onChange={handleInputChange}
              disabled={isSubmitting || isCartEmpty}
            />
          </label>

          <label>
            Notas del pedido
            <textarea
              name="notes"
              rows="4"
              value={checkoutForm.notes}
              onChange={handleInputChange}
              disabled={isSubmitting || isCartEmpty}
            />
          </label>

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting || isCartEmpty}
          >
           {isSubmitting ? "Procesando..." : "Confirmar compra"}
          </button>
        </form>

        {checkoutStatus === "success" && (
          <p className="feedback-message">
            Listo. Tu pedido quedó registrado y el carrito vuelve a cero.
          </p>
        )}

        {checkoutStatus === "empty" && (
          <p className="feedback-message">
            Primero agrega al menos un producto antes de confirmar.
          </p>
        )}
      </div>
    </div>
  );
}

export default CartPanel;
