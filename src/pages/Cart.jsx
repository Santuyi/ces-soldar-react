import { Link } from 'react-router-dom'
import { Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { money } from '../services/products'
import Status from '../components/Status'
export default function Cart() {
  const { items, totals, removeItem, clearCart } = useCart()
  return <section><h1>Tu carrito</h1>{!items.length ? <Status>Tu carrito esta vacio.</Status> : <div className="cart-layout"><div><ul className="cart-list">{items.map((item) => <li key={item.id}><img src={item.img} alt={item.name} /><div><Link to={`/item/${item.id}`}>{item.name}</Link><p>{item.quantity} unidades · {money(item.price)} c/u</p><strong>{money(item.price * item.quantity)}</strong></div><button className="icon-button" type="button" title={`Quitar ${item.name}`} aria-label={`Quitar ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={20} /></button></li>)}</ul><button type="button" onClick={clearCart}><Trash2 size={16} />Vaciar carrito</button></div><aside className="order-summary"><h2>Resumen</h2><p>{totals.quantity} unidades</p><div className="total"><span>Total</span><strong>{money(totals.price)}</strong></div><Link className="primary" to="/checkout">Continuar compra<ArrowRight size={18} /></Link><Link to="/">Seguir comprando</Link></aside></div>}</section>
}
