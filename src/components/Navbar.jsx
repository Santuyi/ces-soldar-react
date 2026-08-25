import CartWidget from './CartWidget'

function Navbar() {
  const categories = [
    'Soldadoras',
    'Electrodos',
    'Caretas',
    'Amoladoras',
    'Consumibles',
  ]

  return (
    <header className="navbar">
      <a className="navbar__brand" href="#top" aria-label="CES Soldar">
        CES Soldar
      </a>
      <nav className="navbar__nav" aria-label="Categorias de productos">
        {categories.map((category) => (
          <a
            className="navbar__link"
            href={`#${category.toLowerCase().replaceAll(' ', '-')}`}
            key={category}
          >
            {category}
          </a>
        ))}
      </nav>
      <CartWidget />
    </header>
  )
}

export default Navbar
