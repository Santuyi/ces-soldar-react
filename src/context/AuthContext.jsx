import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(auth))
  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setLoading(false) }, () => { setUser(null); setLoading(false) })
  }, [])
  return <AuthContext.Provider value={{ user, loading, logout: () => signOut(auth) }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
