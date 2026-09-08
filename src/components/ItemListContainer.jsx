import { useEffect, useState } from 'react'
import { getProducts } from '../mock/asyncMock'
import ItemList from './ItemList'

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts()
      setItems(products)
      setLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <section className="item-list-container">
      <p className="item-list-container__eyebrow">E-commerce en construccion</p>
      <h1>{greeting}</h1>
      <p className="item-list-container__description">
        Tienda online de maquinas, herramientas e insumos para soldadura.
      </p>
      {loading ? (
        <p className="item-list-container__loading">Cargando productos...</p>
      ) : (
        <ItemList products={items} />
      )}
    </section>
  )
}

export default ItemListContainer
