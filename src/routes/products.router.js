const { Router } = require('express');
const router = Router();

let productos = [
    {
        id: '1',
        titulo: 'Producto 1',
        descripcion: 'Descripción del Producto 1',
        precio: 19.99,
        stock: 50,
        thumbnail: 'URL del Producto 1',
        codigo: 'ABC123',
    },
    {
        id: '2',
        titulo: 'Producto 2',
        descripcion: 'Descripción del Producto 2',
        precio: 29.99,
        stock: 30,
        thumbnail: 'URL del Producto 2',
        codigo: 'XYZ789',
    },    
];

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'Get', data: productos });
    
});

router.post('/', (req, res) => {
    const producto = req.body;
    producto.id = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    productos.push(producto);
    const { id, ...restoDelProducto } = producto;
    const productoOrdenado = { id, ...restoDelProducto };
    return res.status(201).json({ status: 'ok', data: productoOrdenado });
});

router.put('/:pid', (req, res) => {
    const id = req.params.pid;
    const producto = req.body;
    const i = productos.findIndex((item) => item.id === id);

    if (i === -1) {
        return res.status(404).json({ status: 'Fail', data: {} });
    }

    productos[i] = {
        id: productos[i].id,
        ...producto,
    };

    return res.status(200).json({ status: 'Put', data: productos[i] });
});

router.delete('/:pid', (req, res) => {
    const id = req.params.pid;
    productos = productos.filter((item) => item.id !== id);
    return res.status(200).json({ status: 'Delete', data: undefined });
});

module.exports = router;