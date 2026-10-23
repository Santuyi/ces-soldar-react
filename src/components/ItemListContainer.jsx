import { useParams } from 'react-router-dom'
import { getProducts } from '../services/products'
import useAsync from '../hooks/useAsync'
import ItemList from './ItemList'
import Status from './Status'

export default function ItemListContainer() {
  const { categoryId } = useParams()
  const { data: items, loading, error, retry } = useAsync(getProducts, categoryId)
  return <section>
    <div className="page-heading"><p className="eyebrow">Equipamiento para tu taller</p><h1>{categoryId || 'CES Soldar'}</h1><p>Maquinas, herramientas e insumos para soldadura.</p></div>
    <div className="section-heading"><h2>{categoryId ? 'Productos de la categoria' : 'Catalogo de productos'}</h2>{items && <span>{items.length} productos</span>}</div>
    {loading ? <Status loading>Cargando productos...</Status> : error ? <Status error={error} retry={retry} /> : items.length ? <ItemList products={items} /> : <Status>No hay productos disponibles en esta categoria.</Status>}
  </section>
}
