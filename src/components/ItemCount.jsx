import { useState } from 'react'

function ItemCount({ stock, initial = 1 }) {
  const [quantity, setQuantity] = useState(initial)

  const decrease = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1))
  }

  const increase = () => {
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, stock))
  }

  return (
    <div className="item-count">
      <div className="item-count__controls" aria-label="Selector de cantidad">
        <button type="button" onClick={decrease} disabled={quantity === 1}>
          -
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={increase} disabled={quantity === stock}>
          +
        </button>
      </div>
      <button className="item-count__add" type="button">
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount
