import { createContext, useContext, useEffect, useReducer } from 'react'
import { cartReducer, cartTotals } from './cartState'

const CartContext = createContext(null)
const storageKey = 'ces-soldar-cart-v1'

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string' && Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0 && Number.isInteger(item.stock) && item.quantity <= item.stock)
  } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readCart)
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(items)) } catch { /* El carrito sigue disponible en memoria. */ }
  }, [items])
  const totals = cartTotals(items)
  return <CartContext.Provider value={{ items, totals, addItem: (product, quantity) => dispatch({ type: 'add', product, quantity }), removeItem: (id) => dispatch({ type: 'remove', id }), clearCart: () => dispatch({ type: 'clear' }) }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
