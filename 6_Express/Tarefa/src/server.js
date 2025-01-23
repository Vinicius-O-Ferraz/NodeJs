const express = require("express");
const app = express();
const port = 5000

const projectRoutes = require('./routes')

app.use(express.static(''))

app.listen(port, () => {
    console.log(`Servidor excutando na porta ${port}`)
});