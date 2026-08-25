function ItemListContainer({ greeting }) {
  return (
    <section className="item-list-container">
      <p className="item-list-container__eyebrow">E-commerce en construccion</p>
      <h1>{greeting}</h1>
      <p className="item-list-container__description">
        Tienda online de maquinas, herramientas e insumos para soldadura.
      </p>
    </section>
  )
}

export default ItemListContainer
