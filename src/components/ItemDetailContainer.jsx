import { useEffect, useState } from 'react'
import { getProductById } from '../mock/asyncMock'
import ItemDetail from './ItemDetail'

function ItemDetailContainer({ productId = 'soldadora-inverter-200' }) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const product = await getProductById(productId)

        if (isActive) {
          setItem(product)
        }
      } catch {
        if (isActive) {
          setError('No se encontro el producto solicitado.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isActive = false
    }
  }, [productId])

  return (
    <section className="item-detail-container">
      <p className="item-detail-container__eyebrow">Detalle de producto</p>
      <h2>Producto destacado</h2>
      {loading && <p className="item-detail-container__status">Cargando detalle...</p>}
      {error && <p className="item-detail-container__status">{error}</p>}
      {!loading && !error && item && <ItemDetail product={item} />}
    </section>
  )
}

export default ItemDetailContainer
