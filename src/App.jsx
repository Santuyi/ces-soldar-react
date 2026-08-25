import './App.css'
import ItemListContainer from './components/ItemListContainer'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <ItemListContainer greeting="Bienvenidos a CES Soldar" />
      </main>
    </>
  )
}

export default App
