const express = require('express')
const app = express()
const apiProducts = require('./routes/products')
const apiCart = require('./routes/cart')
const cors = require('cors');
app.use(cors({
	origin: '*',
	optionsSuccessStatus: 200
}));
app.use(express.json())
app.use('/api/productos',apiProducts)
app.use('/api/carrito',apiCart)

app.listen(8080)