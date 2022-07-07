const fs = require("fs")
const dbpath = './src/db/cart.json'


const createCart = (req,res)=>{
    console.log(req.body)
    const newCart = {id:Date.now(),products:[]}
    fs.promises.readFile(dbpath,'utf8')
        .then(listCarts => {
        const listCartsJson = JSON.parse(listCarts)
        listCartsJson.push(newCart)
        console.log(listCartsJson)
        fs.promises.writeFile(dbpath,JSON.stringify(listCartsJson,null,2))
                .then(e=> res.send(`Carrito creado id:${newCart.id}`))
                .catch(err=>console.log('error: ',err))
    })
}
const deleteCart = (req,res)=>{
    console.log('delete cart')
    const id = Number(req.params.id)
    fs.promises.readFile(dbpath,'utf8')
    .then(listCarts=>{
        const listCartsJson = JSON.parse(listCarts)
        const newListCartJson = listCartsJson.filter(item=>item.id !== id )
        fs.promises.writeFile(dbpath,JSON.stringify(newListCartJson,null,2))
            .then(e=> res.send('carrito eliminado'))
            .catch(err=>console.log('error: ',err))
    })
}

const getAllProductsCart = (req,res)=>{
    const id =Number( req.params.id)
    fs.promises.readFile(dbpath,'utf8')
        .then(cart => {
        const cartJson = JSON.parse(cart)
        res.send(cartJson.find( item => item.id === id ).products)
    })
}

const addProductsCart = (req,res)=>{
    const name = req.query.name
    const idProduct = Number( req.query.idProduct)
    const id =Number( req.params.id)
    fs.promises.readFile(dbpath,'utf8')
        .then(cart => {
        const cartJson = JSON.parse(cart)
        cartJson.find( item => item.id === id ).products.push({name,idProduct:idProduct})
        fs.promises.writeFile(dbpath,JSON.stringify(cartJson,null,2))
                .then(e=> res.send(`Producto agregado`))
                .catch(err=>console.log('error: ',err))
    })
}

const deleteProductCart = (req,res)=>{
    const { idProduct, id } = req.params
    fs.promises.readFile(dbpath,'utf8')
        .then(listCarts => {
        const listCartJson = JSON.parse(listCarts)
        const cart = listCartJson.find( item => item.id === Number(id) )
        const filterProductCart = cart.products.filter( item =>item.idProduct !== Number(idProduct))
        const cartFilter = listCartJson.filter( item => item.id !== Number(id) )
            cart.products = filterProductCart
            cartFilter.push(cart)
            console.log(cartFilter)
        fs.promises.writeFile(dbpath,JSON.stringify(cartFilter,null,2))
                .then(e=> res.send("Producto eliminado"))
                .catch(err=>console.log('error: ',err))
    })
}

module.exports = {createCart,getAllProductsCart,deleteCart,addProductsCart,deleteProductCart}