function CartWidget() {
  return (
    <div className="cart-widget" aria-label="Carrito de compras">
      <span className="cart-widget__icon" aria-hidden="true">
        🛒
      </span>
      <span className="cart-widget__quantity">3</span>
    </div>
  )
}

export default CartWidget
