import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { createOrder, newOrderId } from '../services/orders'
import { money } from '../services/products'
import Auth from './Auth'
import Status from '../components/Status'
export default function Checkout() {
  const { user, loading } = useAuth()
  const { items, totals, clearCart } = useCart()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const request = useRef({ id: null, signature: '', busy: false })
  if (loading) return <Status loading>Verificando sesion...</Status>
  if (confirmation) return <section className="confirmation"><CheckCircle2 size={48} /><h1>Tu pedido fue registrado</h1><p>Numero de orden</p><strong className="order-id">{confirmation.id}</strong><p>Total: {money(confirmation.total)}</p><p>Guardalo para consultar tu compra.</p><Link className="primary" to="/">Volver al catalogo</Link></section>
  if (!items.length) return <Status>Agrega productos al carrito antes de finalizar tu compra.</Status>
  if (!user) return <Auth checkout />
  async function submit(event) {
    event.preventDefault()
    if (request.current.busy) return
    const form = new FormData(event.currentTarget)
    const buyer = { name: form.get('name').trim(), phone: form.get('phone').trim(), address: form.get('address').trim() }
    if (!buyer.name || !buyer.address || buyer.phone.replace(/\D/g, '').length < 6) { setError('Completa tu nombre, direccion y un telefono valido.'); return }
    request.current.busy = true; setBusy(true); setError('')
    try {
      const signature = JSON.stringify({ userId: user.uid, items, buyer })
      if (request.current.signature !== signature) request.current = { id: newOrderId(), signature, busy: true }
      const id = await createOrder(items, buyer, request.current.id)
      setConfirmation({ id, total: totals.price })
      clearCart()
    } catch (err) { setError(err.code ? 'No pudimos guardar tu pedido. Tus productos siguen en el carrito. Intenta nuevamente.' : err.message) }
    finally { request.current.busy = false; setBusy(false) }
  }
  return <section><h1>Finalizar compra</h1><div className="cart-layout"><form onSubmit={submit}><h2>Datos de entrega</h2><p>Cuenta: {user.email}</p><fieldset disabled={busy}>
    <label>Nombre y apellido<input name="name" autoComplete="name" required maxLength={100} /></label>
    <label>Telefono<input name="phone" type="tel" autoComplete="tel" required minLength={6} maxLength={30} /></label>
    <label>Direccion completa<input name="address" autoComplete="street-address" required maxLength={250} /></label>
    {error && <p className="error" role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? 'Guardando pedido...' : 'Confirmar pedido'}</button>
  </fieldset></form><aside className="order-summary"><h2>Tu pedido</h2>{items.map((item) => <p key={item.id}>{item.quantity} x {item.name}<strong>{money(item.price * item.quantity)}</strong></p>)}<div className="total"><span>Total</span><strong>{money(totals.price)}</strong></div>{!busy && <Link to="/cart">Revisar carrito</Link>}</aside></div></section>
}
