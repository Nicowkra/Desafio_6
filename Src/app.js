const express = require("express")
const {Server} = require('socket.io')
const handlenbars = require("express-handlebars")
const productManager = require('./managers/productManager.js')
const chatManager = require('./managers/chatManager.js')

const app = express()
const PORT = process.env.PORT||8080
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



let productService = new productManager
let chatService = new chatManager
io.on('connection',async socket=>{
    console.log("Cliente conectado")

    let products = await productService.get()
    io.emit("productLog", products)

    let chat = await chatService.get()
    io.emit("chatLog", chat)


    socket.on('sendProduct',async data=>{
       await productService.save(data)
       let products = await productService.get()
       io.emit('productLog',products)
    })

    socket.on('sendChat',async data=>{
       await chatService.save(data)
       let chat = await chatService.get()
       io.emit('chatLog',chat)
    })



})

