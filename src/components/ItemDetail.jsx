import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { money } from '../services/products'
import ItemCount from './ItemCount'
export default function ItemDetail({ product }) {
  const { items, addItem } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = items.find((item) => item.id === product.id)?.quantity || 0
  const remaining = Math.max(0, product.stock - inCart)
  return <section className="item-detail">
    <img className="item-detail__image" src={product.img} alt={product.name} />
    <div className="item-detail__content"><Link className="eyebrow" to={`/category/${encodeURIComponent(product.category)}`}>{product.category}</Link><h1>{product.name}</h1><p>{product.description}</p>
      {product.specifications && <dl className="specifications">{Object.entries(product.specifications).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      <strong className="price">{money(product.price)}</strong><p>{product.stock} unidades en stock{inCart > 0 && ` · ${inCart} en tu carrito`}</p>
      <ItemCount stock={remaining} onAdd={(quantity) => { addItem(product, quantity); setAdded(true) }} />
      {added && <p role="status" className="success">Producto agregado. <Link to="/cart">Ir al carrito</Link></p>}
    </div>
  </section>
}
