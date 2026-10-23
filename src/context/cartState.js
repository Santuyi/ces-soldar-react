export function cartReducer(items, action) {
  if (action.type === 'clear') return []
  if (action.type === 'remove') return items.filter((item) => item.id !== action.id)
  if (action.type === 'add') {
    const { product, quantity } = action
    if (!Number.isInteger(quantity) || quantity <= 0 || !Number.isInteger(product.stock) || product.stock <= 0) return items
    const existing = items.find((item) => item.id === product.id)
    const nextQuantity = Math.min((existing?.quantity ?? 0) + quantity, product.stock)
    return existing
      ? items.map((item) => item.id === product.id ? { ...product, quantity: nextQuantity } : item)
      : [...items, { ...product, quantity: nextQuantity }]
  }
  return items
}

export function cartTotals(items) {
  return items.reduce((total, item) => ({ quantity: total.quantity + item.quantity, price: total.price + item.quantity * item.price }), { quantity: 0, price: 0 })
}
