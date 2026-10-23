import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogOut, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { categories } from '../services/products'
import CartWidget from './CartWidget'
export default function Navbar() {
  const { user, logout } = useAuth()
  const [error, setError] = useState('')
  return <header><div className="navbar"><Link className="navbar__brand" to="/">CES <span>Soldar</span></Link><div className="navbar__account">
    {user ? <><span className="user-email" title={user.email}>{user.email}</span><button className="icon-button" type="button" title="Cerrar sesion" aria-label="Cerrar sesion" onClick={async () => { try { await logout(); setError('') } catch { setError('No pudimos cerrar la sesion. Intenta nuevamente.') } }}><LogOut size={20} /></button></> : <Link className="account-link" to="/login"><UserRound size={20} /><span>Mi cuenta</span></Link>}
    <CartWidget /></div></div><nav className="navbar__nav" aria-label="Categorias"><NavLink to="/" end>Todos los productos</NavLink>{categories.map((category) => <NavLink key={category} to={`/category/${encodeURIComponent(category)}`}>{category}</NavLink>)}</nav>{error && <p role="alert">{error}</p>}</header>
}
