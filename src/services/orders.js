import { collection, doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { auth, requireDatabase } from './firebase'

export async function createOrder(items, buyer, orderId) {
  if (!auth?.currentUser) throw new Error('Inicia sesion para completar la compra.')
  if (!items.length) throw new Error('Tu carrito esta vacio.')
  if (!buyer.name.trim() || !buyer.phone.trim() || !buyer.address.trim()) throw new Error('Completa los datos de entrega.')
  const db = requireDatabase()
  const orderRef = doc(db, 'orders', orderId)
  // El ID estable evita duplicar la orden si se reintenta tras un fallo de red.
  return runTransaction(db, async (transaction) => {
    const existing = await transaction.get(orderRef)
    if (existing.exists()) return existing.id
    const snapshots = await Promise.all(items.map((item) => transaction.get(doc(db, 'products', item.id))))
    const orderItems = snapshots.map((snapshot, index) => {
      const item = items[index]
      const product = snapshot.data()
      if (!snapshot.exists() || !Number.isInteger(item.quantity) || item.quantity < 1 || product.stock < item.quantity) throw new Error(`Stock insuficiente para ${item.name}. Revisa tu carrito.`)
      if (product.price !== item.price) throw new Error(`Cambio el precio de ${item.name}. Quitalo del carrito y agregalo nuevamente.`)
      return { id: snapshot.id, name: product.name, quantity: item.quantity, price: product.price }
    })
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    transaction.set(orderRef, { userId: auth.currentUser.uid, email: auth.currentUser.email, buyer, items: orderItems, total, createdAt: serverTimestamp() })
    return orderRef.id
  })
}

export function newOrderId() { return doc(collection(requireDatabase(), 'orders')).id }
export async function getOrder(id) {
  const snapshot = await getDoc(doc(requireDatabase(), 'orders', id))
  return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null
}
