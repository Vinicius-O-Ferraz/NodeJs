const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Para enviar html como resposta utilizamos o método sendFile
const basePath = path.join(__dirname,'templates')


app.get("/"(req,res =>{
    res.sendFile(`${basePath}/index.html`)
}))

app.listen(port,()=>{
    res.send('Olá mundo!')
})