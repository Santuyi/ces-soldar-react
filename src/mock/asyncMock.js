const products = [
  {
    id: 'soldadora-inverter-200',
    name: 'Soldadora Inverter 200A',
    price: 185000,
    category: 'Soldadoras',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
    stock: 8,
    description:
      'Equipo compacto para trabajos de soldadura MMA, ideal para uso profesional y de taller.',
  },
  {
    id: 'electrodos-6013',
    name: 'Electrodos 6013',
    price: 12500,
    category: 'Electrodos',
    img: 'https://images.unsplash.com/photo-1605557202138-097824c36c4f?auto=format&fit=crop&w=900&q=80',
    stock: 24,
    description:
      'Caja de electrodos rutilicos para soldaduras limpias en estructuras livianas.',
  },
  {
    id: 'careta-fotosensible',
    name: 'Careta Fotosensible',
    price: 42000,
    category: 'Caretas',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    description:
      'Proteccion visual automatica para soldar con mayor comodidad y seguridad.',
  },
  {
    id: 'amoladora-angular',
    name: 'Amoladora Angular 115mm',
    price: 63500,
    category: 'Amoladoras',
    img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=80',
    stock: 6,
    description:
      'Herramienta versatil para corte, desbaste y preparacion de piezas metalicas.',
  },
  {
    id: 'discos-corte-metal',
    name: 'Discos de Corte para Metal',
    price: 8900,
    category: 'Consumibles',
    img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
    stock: 40,
    description:
      'Pack de discos reforzados para cortes precisos en hierro y acero.',
  },
]

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000)
  })
}
