// Clase 5 Express

const express = require('express')
const handlebars = require('express-handlebars');

// Requires y rutas
const { uploader } = require('./helpers/uploader.js')
const ProductManager = require('./managers/ProductManager.js')
const userRouter = require('./routes/users.router.js')
const prodRouter = require('./routes/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const prodManager = new ProductManager('products.json')

const { Server } = require('socket.io')

const app = express()
const port = 8080 || process.env.port


app.get('/products', (req, res) => {
    const limit = req.query.limit
    const productos = prodManager.getAllProducts()

    if (limit) {
        const productosLimitados = productos.slice(0, limit)
        res.json({ products: productosLimitados })
    } else {
        res.json({ products: productos })
    }
})

// Clase 7 Rutas

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

// Handlebars config. Extension y motor
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use('/api/usuarios', userRouter)
app.use('/api/productos', prodRouter)
app.use('/views', viewsRouter)

// Middleware para subir un archivo
app.post('/single', uploader.single('myFile'), (req, res) => {
    res.send('Archivo subido!')
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Error de servidor')
})

const serverHttp = app.listen(port,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${port}`)
})

const io = new Server(serverHttp)

let messagesArray = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    socket.on('message', data => {
        messagesArray.push(data)
        io.emit('messageLogs', messagesArray)
    })
})
/*io.on('connection', socket => {
    console.log('Cliente conectado')

    // socket.on('mensajeCliente', data => {
    //     console.log(data)
    // })
    //socket.emit('solo-actual', 'Solo el socket actual!')

    // Servidor emitiendo
    //socket.broadcast.emit('todos-menos-actual', 'Evento que reciben todos, menos uno actual')

    // Emite un evento para todos incluyendo actual
    //io.emit('todos', 'Evento para todos, incluido actual')

    // Actividad
    let arrayMensajes = []
    socket.emit('enviar-mensajes-cliente', arrayMensajes)

    socket.on('message', mensajes => {
        arrayMensajes.push({id: socket.id, message: mensajes})
        io.emit('recibir-mensajes-cliente', arrayMensajes)
    })


}) */


/* Status
200: Peticion correcta sin inconvenientes
201: Peticion correcta que crea un recurso
3xx: Redirecciones. Cuando un recurso se movio o necesitamos apuntar a otro servicio
400: Cliente realiza peticion que no cumpla reglas de comunicacion (mala consulta, falta de datos)
401/403: Cliente no identificado o su rol no es el indicado.
404: Recurso no encontrado, ya sea dato solictado o el mismo endpoint
500: Problema en el servidor. Error o detalle que no haya considerador el servidor al tratar un caso.
*/
