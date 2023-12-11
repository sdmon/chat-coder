const { Router } = require('express');
const router = Router();

// CFG

let usuarios = [
    { id: '1', nombre: 'Seba', edad: 29 },
    { id: '2', nombre: 'Belen', edad: 25 },
    { id: '3', nombre: 'Tobi', edad: 24 },
    { id: '4', nombre: 'Aye', edad: 30 },
    { id: '5', nombre: 'Juan', edad: 29 },
];


// Middlewares
const midd = ((req, res, next) => {
    // Agrego propiedad a req (request)
    req.user1 = "Seba";       
    // Avanza
    next();
})

const midd2 = ((req, res, next) => {
    // Agrego propiedad a req (request)
    req.email1 = "seba@email.com";       
    // Avanza
    next();
})
// Al GET le pasamos el metodo middleware 
router.get('/', midd, midd2, (req, res) => {
    // En vez de pasar el array de usuarios le pasamos el user1
    const user = { 
        nombre: req.user1,
        email: req.email1,
    }
    return res.status(200).json({ status: 'ok', data: usuarios, user: user });
    //return res.status(200).json({ status: 'Get', data: usuarios });
});

router.post('/', (req, res) => {
    // Mandamos request por el body
    const usuario = req.body;
    if (!usuario.nombre || !usuario.edad) {
        return res.status(404).send( { message: "Faltan los datos del usuario!"})
    }
    usuario.id = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    usuarios.push(usuario);
    const { id, ...restoDelUsuario } = usuario;
    const usuarioOrdenado = { id, ...restoDelUsuario };
    return res.status(201).json({ status: 'ok', data: usuarioOrdenado });
});

router.put('/:uid', (req, res) => {
    const id = req.params.uid; // Cambio aquí: Utiliza req.params.uid
    const usuario = req.body;
    const i = usuarios.findIndex((item) => item.id === id);

    if (i === -1) {
        return res.status(404).json({ status: 'Fail', data: {} });
    }

    usuarios[i] = {
        id: usuarios[i].id,
        ...usuario,
    };

    return res.status(200).json({ status: 'Put', data: usuarios[i] });
});

router.delete('/:uid', (req, res) => {
    const id = req.params.uid; // Cambio aquí: Utiliza req.params.uid
    usuarios = usuarios.filter((item) => item.id !== id);
    return res.status(200).json({ status: 'Delete', data: undefined });
});

// Middleware de terceros

module.exports = router;