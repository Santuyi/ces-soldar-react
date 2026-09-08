function Item({ product }) {
  return (
    <article className="item-card">
      <img className="item-card__image" src={product.img} alt={product.name} />
      <div className="item-card__content">
        <span className="item-card__category">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="item-card__footer">
          <strong>${product.price.toLocaleString('es-AR')}</strong>
          <span>Stock: {product.stock}</span>
        </div>
      </div>
    </article>
  )
}

export default Item
