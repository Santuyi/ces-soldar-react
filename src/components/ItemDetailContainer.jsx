import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/products'
import useAsync from '../hooks/useAsync'
import ItemDetail from './ItemDetail'
import Status from './Status'
export default function ItemDetailContainer() {
  const { productId } = useParams()
  const { data, loading, error, retry } = useAsync(getProductById, productId)
  if (loading) return <Status loading>Cargando producto...</Status>
  if (error) return <Status error={error} retry={retry} />
  if (!data) return <Status>El producto que buscas no existe.</Status>
  return <><Link className="back-link" to="/">Volver al catalogo</Link><ItemDetail key={data.id} product={data} /></>
}
