import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import Navbar from './components/Navbar'
import Status from './components/Status'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return <BrowserRouter><AuthProvider><CartProvider><ScrollToTop /><a className="skip-link" href="#main">Ir al contenido</a><Navbar /><main id="main" className="app"><Routes>
    <Route path="/" element={<ItemListContainer />} />
    <Route path="/category/:categoryId" element={<ItemListContainer />} />
    <Route path="/item/:productId" element={<ItemDetailContainer />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Auth key="login" />} />
    <Route path="/register" element={<Auth key="register" register />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="*" element={<Status>La pagina que buscas no existe.</Status>} />
  </Routes></main><footer>CES Soldar · Maquinas, herramientas e insumos</footer></CartProvider></AuthProvider></BrowserRouter>
}
