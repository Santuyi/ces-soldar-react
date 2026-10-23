import { Link } from 'react-router-dom'
export default function Status({ loading, error, retry, children }) {
  return <div className="status" role={error ? 'alert' : 'status'}>
    {loading && <span className="spinner" aria-hidden="true" />}
    <p>{error || children || 'Cargando...'}</p>
    {retry && <button type="button" onClick={retry}>Reintentar</button>}
    {!loading && !retry && <Link to="/">Volver al catalogo</Link>}
  </div>
}
