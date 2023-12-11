const { Router } = require('express')

const router = Router()

const productMock = [
    {title: 'Product 1', price: 30000, stock: 100, description: 'Prod 1'},
    {title: 'Product 2', price: 50000, stock: 200, description: 'Prod 2'},
    {title: 'Product 3', price: 70000, stock: 300, description: 'Prod 3'},
]

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Seba Commerce',
        name: 'Semmerce',
        style: 'style.css'
    })
})

router.get('/productos', (req, res) => {

    const userMock = {
        title: 'Seba Commerce',
        name: 'Productos',
        role: 'admin'
    }
    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        products: productMock,
        style: 'style.css'
    })
})

module.exports = router

