import ItemCount from './ItemCount'

function ItemDetail({ product }) {
  return (
    <section className="item-detail">
      <div className="item-detail__media">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="item-detail__content">
        <span className="item-detail__category">{product.category}</span>
        <h2>{product.name}</h2>
        <p className="item-detail__description">{product.description}</p>
        <div className="item-detail__meta">
          <strong>${product.price.toLocaleString('es-AR')}</strong>
          <span>Stock disponible: {product.stock}</span>
        </div>
        <ItemCount stock={product.stock} />
      </div>
    </section>
  )
}

export default ItemDetail
