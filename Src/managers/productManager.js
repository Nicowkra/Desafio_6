const fs = require("fs")

const path = __dirname+"/../Files/productos.JSON"

const fetch = async()=>{
    let data = await fs.promises.readFile(path, "utf-8")
    let products = JSON.parse(data)
    return products
}


class Manager{
    
    get = async()=>{
        if(fs.existsSync(path)){
            try{
                let products = await fetch()
                return {status:"success", payload: products}
            }catch(error){
                return{status:"error",error,error}
            }
        
    }
}

    save = async (product)=>{
        if(fs.existsSync(path)){
           try{
             let products = await fetch()
             if(products.id=== 0){
                product.id = 1
                 await fs.promises.writeFile(path,JSON.stringify([product],null,2))
                 return {status:"success",message:"Product added"}
             }
             product.id = products[products.length-1].id+1
             products.push(product)
             await fs.promises.writeFile(path,JSON.stringify(products,null,2))
             return {status:"success",message:"Product added"}

         }catch(error){
             return {status:"error",error:error}
         }
     }
     product.id = 1
     await fs.promises.writeFile(path,JSON.stringify([product],null,2))
     return {status:"success",message:"Product added"}
    }

}

module.exports = Manager