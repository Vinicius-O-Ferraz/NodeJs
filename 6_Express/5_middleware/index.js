const express = require("express");
const app = express();
const port = 3000; // variável de ambiente

const path = require("path");

const basePath = path.join(__dirname, "templates");

// novo
const checkAuth = function(req,res,next){
    req.authStatus = true // verifica se o usuário está logado

    if(req.authStatus){
        console.log('Está logado')
    }else{
        console.log('Não está logado')
    }
}

app.use(checkAuth) // use é usado para ativar o middleware

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`);
});