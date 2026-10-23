import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
export default function CartWidget() {
  const { totals } = useCart()
  return <Link className="cart-widget" to="/cart" aria-label={`Carrito, ${totals.quantity} unidades`} title="Ver carrito"><ShoppingCart size={22} /><span>{totals.quantity}</span></Link>
}
