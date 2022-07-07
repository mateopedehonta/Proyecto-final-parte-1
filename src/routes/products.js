const { Router } = require('express')
const products = Router()
const {
    addProducts,
    idProducts,
    allProducts,
    deleteProduct,
    editProducto
} = require('../controllers/controllersProducts')

products.route('/')
    .post(addProducts)
    .get(allProducts)

products.route('/:id')
    .get(idProducts)
    .put(editProducto)
    .delete(deleteProduct)

module.exports = products