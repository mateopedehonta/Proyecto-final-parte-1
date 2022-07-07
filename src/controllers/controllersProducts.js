const fs = require("fs")
const dbpath = './src/db/products.json'

const allProducts=(req, res)=>{
    fs.promises.readFile(dbpath,'utf8')
    .then(productList =>{
        const productListJson = JSON.parse(productList)
        res.send(productListJson)
    } )
}

const idProducts=(req, res)=>{
    const id = Number(req.params.id)
    fs.promises.readFile(dbpath,'utf8')
        .then(productList =>{
            const productListJson = JSON.parse(productList)
            res.send(productListJson.find(item => item.id === id))
        } )
}
const addProducts=(req, res)=>{
    const { name , description, price , stock , timestamp, url } = req.body
    fs.promises.readFile(dbpath,'utf8')
        .then(productList=>{
            const productListJson = JSON.parse(productList)
            productListJson.push({
                name,
                description,
                price ,
                stock,
                timestamp,
                url,
                id: Date.now()
            })
            fs.promises.writeFile(dbpath,JSON.stringify(productListJson,null,2))
                .then(e=> res.send(`Producto agregado`))
                .catch(err=>console.log('error: ',err))
        })
   
}
const editProducto=(req, res)=>{
    const { name } = req.query
    const id = Number(req.params.id)
    const editProduct = { name , id}
    // console.log(editProduct)
    fs.promises.readFile(dbpath,'utf8')
    .then(productList=>{
        const productListJson = JSON.parse(productList)
        const newProductListJson = productListJson.filter(item=>item.id !== id )
        newProductListJson.push(editProduct)
        fs.promises.writeFile(dbpath,JSON.stringify(newProductListJson,null,2))
            .then(e=> res.send('producto editado'))
            .catch(err=>console.log('error: ',err))
    })
}
const deleteProduct=(req, res)=>{
    const id = Number(req.params.id)

    fs.promises.readFile(dbpath,'utf8')
    .then(productList=>{
        const productListJson = JSON.parse(productList)
        const newProductListJson = productListJson.filter(item=>item.id !== id )
        fs.promises.writeFile(dbpath,JSON.stringify(newProductListJson,null,2))
            .then(e=> res.send('producto eliminado'))
            .catch(err=>console.log('error: ',err))
    })
}

module.exports = {addProducts,allProducts,deleteProduct,editProducto,idProducts}