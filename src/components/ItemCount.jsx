import { useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
export default function ItemCount({ stock, onAdd }) {
  const [selected, setSelected] = useState(1)
  const quantity = Math.max(0, Math.min(selected, stock))
  return <div className="item-count"><div className="item-count__controls" aria-label="Cantidad">
    <button type="button" title="Restar una unidad" aria-label="Restar una unidad" disabled={quantity <= 1} onClick={() => setSelected(quantity - 1)}><Minus size={18} /></button>
    <output aria-live="polite" aria-label="Cantidad seleccionada">{quantity}</output>
    <button type="button" title="Sumar una unidad" aria-label="Sumar una unidad" disabled={quantity >= stock} onClick={() => setSelected(quantity + 1)}><Plus size={18} /></button>
  </div><button className="primary" type="button" disabled={quantity === 0} onClick={() => onAdd(quantity)}><ShoppingCart size={18} />{stock > 0 ? 'Agregar al carrito' : 'Sin stock disponible'}</button></div>
}
