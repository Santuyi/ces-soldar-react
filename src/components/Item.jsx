import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { money } from '../services/products'
export default function Item({ product }) {
  return <article className="item-card">
    <Link to={`/item/${product.id}`} aria-label={`Ver ${product.name}`}><img className="item-card__image" src={product.img} alt={product.name} loading="lazy" /></Link>
    <div className="item-card__content"><span className="eyebrow">{product.category}</span><h2><Link to={`/item/${product.id}`}>{product.name}</Link></h2><p>{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}</p><div className="item-card__footer"><strong>{money(product.price)}</strong><Link className="icon-button" to={`/item/${product.id}`} aria-label={`Ver detalle de ${product.name}`} title="Ver detalle"><ArrowUpRight size={20} /></Link></div></div>
  </article>
}
