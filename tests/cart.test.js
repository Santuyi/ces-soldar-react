import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartReducer, cartTotals } from '../src/context/cartState.js'

const product = { id: 'soldadora', price: 100, stock: 3 }
test('sumar repetidamente un producto nunca supera el stock', () => {
  let cart = cartReducer([], { type: 'add', product, quantity: 2 })
  cart = cartReducer(cart, { type: 'add', product, quantity: 2 })
  assert.equal(cart.length, 1)
  assert.equal(cart[0].quantity, 3)
  assert.deepEqual(cartTotals(cart), { quantity: 3, price: 300 })
})
test('no acepta cantidades invalidas ni productos sin stock', () => {
  for (const quantity of [-1, 0, 1.5, NaN]) assert.deepEqual(cartReducer([], { type: 'add', product, quantity }), [])
  assert.deepEqual(cartReducer([], { type: 'add', product: { ...product, stock: 0 }, quantity: 1 }), [])
})
test('quitar y vaciar recalculan correctamente los totales', () => {
  let cart = cartReducer([], { type: 'add', product, quantity: 2 })
  cart = cartReducer(cart, { type: 'add', product: { id: 'otro', price: 25, stock: 5 }, quantity: 3 })
  assert.deepEqual(cartTotals(cart), { quantity: 5, price: 275 })
  cart = cartReducer(cart, { type: 'remove', id: 'soldadora' })
  assert.deepEqual(cartTotals(cart), { quantity: 3, price: 75 })
  assert.deepEqual(cartReducer(cart, { type: 'clear' }), [])
})
