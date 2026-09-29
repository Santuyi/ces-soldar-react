# CES Soldar

CES Soldar es un e-commerce en desarrollo para la venta de maquinas,
herramientas e insumos para soldadura.

Este proyecto forma parte del curso de React JS de Coderhouse y se construira de
manera progresiva durante las pre-entregas.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS

## Componentes principales

- `Navbar`: muestra la marca CES Soldar, categorias de productos y el acceso al
  carrito.
- `CartWidget`: representa el carrito de compras con un icono y una cantidad de
  productos hardcodeada.
- `ItemListContainer`: recibe la prop `greeting` desde `App.jsx` y muestra el
  mensaje principal de bienvenida. Tambien obtiene los productos desde una
  promesa local y los guarda en el estado `items`.
- `ItemList`: recibe los productos por props y los recorre con `.map()` para
  renderizar una card por cada producto.
- `Item`: muestra la informacion individual de cada producto.
- `ItemDetailContainer`: recibe un identificador de producto, obtiene el detalle
  desde una promesa y administra los estados de carga y error.
- `ItemDetail`: recibe el producto por props y renderiza la vista completa de
  detalle.
- `ItemCount`: recibe el stock disponible por props y permite seleccionar una
  cantidad respetando los limites del producto.

## Simulacion de datos

El archivo `src/mock/asyncMock.js` contiene un array de productos de CES Soldar y
exporta las funciones `getProducts` y `getProductById`.

`getProducts` devuelve una `Promise` que se resuelve despues de 2 segundos con
los productos. En `ItemListContainer`, la carga se ejecuta una sola vez con
`useEffect`, se guarda el resultado en el estado `items` y luego se renderiza el
listado mediante `ItemList`.

`getProductById` recibe un `id` de producto, busca ese producto dentro del array
y devuelve una `Promise` con el resultado. En caso de no encontrarlo, la promesa
se rechaza para que `ItemDetailContainer` pueda mostrar un mensaje de error.

## Instalacion

Requisito previo: Node.js 20.19 o superior.

Para instalar las dependencias del proyecto, ejecutar:

```bash
npm install
```

## Ejecucion

Para iniciar el entorno de desarrollo, ejecutar:

```bash
npm run dev
```

Luego abrir la URL local que indique la terminal.
