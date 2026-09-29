import './App.css'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <ItemListContainer greeting="Bienvenidos a CES Soldar" />
        <ItemDetailContainer productId="soldadora-inverter-200" />
      </main>
    </>
  )
}

export default App
