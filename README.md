# CES Soldar

Proyecto final del curso React JS de Coderhouse: tienda educativa de maquinas,
herramientas e insumos para soldadura. No procesa pagos reales.

Tienda publicada: https://ces-soldar-react.vercel.app/

## Tecnologias

React 19, JavaScript, Vite, React Router, Firebase Authentication, Cloud Firestore,
Context API, CSS y Lucide React. Desplegado en Vercel.

## Instalacion y desarrollo

Requiere Node.js compatible con Vite (20.19+ o 22.12+).

```bash
npm install
```

Crear `.env.local` a partir de `.env.example` y completar las seis variables
`VITE_FIREBASE_*` con la configuracion de una aplicacion web de Firebase.
No incluir cuentas de servicio ni claves privadas en variables VITE: estas
variables forman parte del codigo publico del navegador.

```bash
npm run dev
npm run build
npm run lint
node --test tests/cart.test.js
```

## Funcionalidades

- Catalogo y categorias obtenidos de Firestore, sin datos mock de respaldo.
- Detalle de producto con descripcion, imagen, precio y stock.
- Carrito persistido en el navegador, cantidades limitadas por stock y totales.
- Registro, inicio y cierre de sesion con Firebase email/password.
- Checkout protegido: datos de entrega, validacion de precios y disponibilidad.
- Orden en Firestore con usuario, comprador, productos, total y fecha del servidor.
- Confirmacion con ID; el carrito se vacia solo cuando la orden se guarda.
- Estados de carga, error, categoria vacia y producto inexistente.

## Organizacion

`src/components` contiene las vistas reutilizables del catalogo.
`src/pages` contiene carrito, acceso y checkout.
`src/context` administra sesion y carrito; `src/hooks` administra carga asincrona.
`src/services` concentra Firebase y las consultas de productos y ordenes.
`tests` incluye pruebas del reducer del carrito.

## Firebase

Habilitar Authentication con email/password y una base Cloud Firestore Standard.
Publicar `firestore.rules` desde la consola. Los productos tienen lectura publica
y solo se administran desde la consola; cada usuario accede unicamente a sus
ordenes. Las reglas validan precios, cantidades, propietario y total.

Coleccion `products`: documentos con `name`, `category`, `description`, `img`
(strings), `price` (numero) y `stock` (entero). El ID del documento identifica
el producto. Las imagenes locales se encuentran en `public/products`.

Coleccion `orders`: se crea al confirmar la primera compra. Las reglas admiten
hasta cinco productos distintos por orden, correspondientes al catalogo actual;
si el catalogo crece, ampliar esa validacion antes de publicar.
La compra valida disponibilidad, pero no descuenta inventario ni procesa pagos.

## Publicacion en Vercel

Importar el repositorio como proyecto Vite. Build: `npm run build`; salida: `dist`.
Configurar las mismas variables de `.env.example` en el entorno Production.
Agregar el dominio definitivo en Firebase Authentication > Configuracion >
Dominios autorizados. `vercel.json` permite recargar rutas internas sin error 404.

## Comprobacion manual

Probar catalogo, categorias, detalle y una ruta inexistente. Agregar varias
cantidades y verificar limites, totales y persistencia al recargar. Comprobar
registro, cierre e inicio de sesion, y checkout sin acceso. Confirmar una orden
con datos de prueba y verificar su ID en Firestore y el carrito vacio.
Repetir en la URL publicada y en una pantalla angosta antes de entregar.
