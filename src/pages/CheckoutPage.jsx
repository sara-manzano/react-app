import CartPanel from '../components/CartPanel'
import { useShop } from '../context/useShop'

function CheckoutPage() {
  const {
    cartItems,
    checkoutForm,
    checkoutStatus,
    handleCheckoutChange,
    handleCheckoutSubmit,
    removeFromCart,
    subtotal,
    updateCartQuantity,
  } = useShop()

  const hasProducts = cartItems.length > 0

  return (
    <main className="page-shell page-shell--route">
      <section className="section-block">
        <div className="section-heading fade-in">
          <div>
            <p className="section-heading__eyebrow">Pedido</p>
            <h2>{hasProducts ? 'Revisa tu selección y confirma la compra cuando quieras.' : 'Todavía no tienes productos en el pedido.'}</h2>
          </div>
        </div>

        <CartPanel
          cartItems={cartItems}
          checkoutForm={checkoutForm}
          checkoutStatus={checkoutStatus}
          onCheckoutChange={handleCheckoutChange}
          onCheckoutSubmit={handleCheckoutSubmit}
          onDecrease={updateCartQuantity}
          onIncrease={updateCartQuantity}
          onRemove={removeFromCart}
          subtotal={subtotal}
        />
      </section>
    </main>
  )
}

export default CheckoutPage