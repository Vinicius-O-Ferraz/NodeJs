const express = require("express");
const app = express();

const port = 5000

const path = require("path")
const basePath = path.join(__dirname,  'templates')

app.get('/',(req,res)=>{
    res.sendFile(path.join(basePath, 'lista_de_compras.html'))
})

app.get('/lista_de_compras',(req,res)=>{
    res.sendFile(path.join(basePath, 'lista_de_compras.html'))
})

app.listen(port, () => {
    console.log(`Servidor excutando na porta 5000`)
});