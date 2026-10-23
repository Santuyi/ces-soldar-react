import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { auth } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import Status from '../components/Status'
const messages = {
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email. Inicia sesion.',
  'auth/invalid-credential': 'El email o la contrasena no son correctos.',
  'auth/invalid-email': 'Ingresa un email valido.',
  'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
  'auth/network-request-failed': 'Revisa tu conexion e intenta nuevamente.',
}
export default function Auth({ register = false, checkout = false }) {
  const { user, loading } = useAuth()
  const [params] = useSearchParams()
  const next = checkout || params.get('next') === '/checkout' ? '/checkout' : '/'
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  if (loading) return <Status loading>Verificando sesion...</Status>
  if (user) return <Navigate to={next} replace />
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    const fields = new FormData(event.currentTarget)
    if (register && fields.get('password') !== fields.get('confirm')) { setError('Las contrasenas no coinciden.'); return }
    if (!auth) { setError('El acceso a cuentas no esta disponible en este momento.'); return }
    setBusy(true); setError('')
    try {
      const action = register ? createUserWithEmailAndPassword : signInWithEmailAndPassword
      await action(auth, fields.get('email').trim(), fields.get('password'))
    } catch (err) { setError(messages[err.code] || 'No pudimos completar la solicitud. Intenta nuevamente.') }
    finally { setBusy(false) }
  }
  return <section className="auth-page"><p className="eyebrow">Mi cuenta CES Soldar</p><h1>{register ? 'Crear cuenta' : 'Iniciar sesion'}</h1>{checkout && <p>Ingresa para continuar tu compra. Tus productos siguen en el carrito.</p>}<form onSubmit={submit}>
    <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    <label>Contrasena<input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} required minLength={6} maxLength={128} /></label>
    {register && <label>Repetir contrasena<input name="confirm" type="password" autoComplete="new-password" required minLength={6} maxLength={128} /></label>}
    {error && <p className="error" role="alert">{error}</p>}<button className="primary" disabled={busy}>{busy ? 'Procesando...' : register ? 'Crear cuenta' : 'Ingresar'}</button>
  </form><p>{register ? 'Ya tenes cuenta?' : 'Primera vez en CES Soldar?'} <Link to={`${register ? '/login' : '/register'}?next=${encodeURIComponent(next)}`}>{register ? 'Iniciar sesion' : 'Crear cuenta'}</Link></p></section>
}
