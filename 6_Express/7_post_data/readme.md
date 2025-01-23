O código desenvolvido nessa seção usar o middleware do express para a autenticação do usuário
~~~
const checkAuth = function(req,res,next){
    req.authStatus = true // verifica se o usuário está logado

    if(req.authStatus){
        console.log('Está logado')
    }else{
        console.log('Não está logado')
    }
}
~~~
