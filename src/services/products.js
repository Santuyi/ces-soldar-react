import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { requireDatabase } from './firebase'

export const categories = ['Soldadoras', 'Electrodos', 'Caretas', 'Amoladoras', 'Consumibles']
export const money = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)

export async function getProducts(category) {
  const ref = collection(requireDatabase(), 'products')
  const snapshot = await getDocs(category ? query(ref, where('category', '==', category)) : ref)
  return snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
}

export async function getProductById(id) {
  const snapshot = await getDoc(doc(requireDatabase(), 'products', id))
  return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null
}
