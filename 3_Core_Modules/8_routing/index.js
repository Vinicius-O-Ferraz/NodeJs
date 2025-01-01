const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000
const server = http.createServer((req,res)=>{

    const q = url.parse(req.url, true)
    const filename = q.pathname.substring(1)

    if(filename.includes('html')){
        if(fs.existsSync(filename)) {
            console.log(filename)
            fs.readFile(filename, function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }else{
            console.log("Deve ter errado o nome do artigo")
        }
    }
})

server.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})