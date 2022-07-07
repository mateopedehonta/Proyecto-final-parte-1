const { Router } = require('express')
const cart = Router()

const {
        createCart,
        getAllProductsCart,
        deleteCart,
        addProductsCart,
        deleteProductCart
    } = require('../controllers/controllersCart')


cart.route('/')
    .post(createCart)

cart.route('/:id')
    .delete(deleteCart)

cart.route('/:id/productos')
    .get(getAllProductsCart)
    .post(addProductsCart)

cart.route('/:id/productos/:idProduct')
    .delete(deleteProductCart)

module.exports = cart