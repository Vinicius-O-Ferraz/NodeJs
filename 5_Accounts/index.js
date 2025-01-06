const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([{
        type:'list',
        name:'action',
        message:'O que você deseja fazer',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair',],
        }
    ])
    .then((answer)=>{

        const action = answer['action']
        console.log(action)

        if(action === 'Criar conta'){
            createAccount()
        }else if(action === 'Consultar saldo'){
            getAccountBalance()
        }else if(action === 'Depositar'){
            deposit()
        } else if(action === 'Sacar'){
           withdraw()
        }else if(action === 'Sair'){
            console.log('Finishing service')
            process.exit()
        }
    })
    .catch((err)=> console.log(err))
}

function createAccount(){
    console.log(chalk.bgWhite.black('Congratulations on choosing our bank!'))
    console.log(chalk.bgWhite.black('Choose the settings of your account bellow:'))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
    {
        name: 'accountName',
        message: "Choose your account's name"   
    }
]).then(answer=>{

    const accountName = answer['accountName']
    console.info(accountName)

    if(!fs.existsSync('accounts')){
        fs.mkdirSync('accounts')
    }

    if(fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('This account already exists!'))
        buildAccount()
        return
    }

    fs.writeFileSync(`accounts/${accountName}.json`,
        '{"balance":0}',
         function(err)
    {
        console.log(err)
    }
)

    console.log(chalk.green("Your account has been created"))
    operation()


}).catch((err)=> console.log(err))
}

function deposit()
    {
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da conta'
    }
])
.then((answer) =>{
    const accountName = answer['accountName']
    if(!checkAccount(accountName)){
        return deposit();
    }

    inquirer.prompt([
        {
            name:'ammount',
            message: 'Quanto você deseja depositar',
        }
    ]).then((answer)=>{

        const ammount = answer['ammount']
        addAmount(accountName,ammount)
        operation()
        
    }).catch((err)=>console.log(err))


    })
    .catch((err)=>console.log(err))
}


function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log('escolha outro nome')
        return false
    }
    return true
}

function addAmount(accountName, ammount){
    const accountData = getAccount(accountName);


    if(!ammount){
        console.log("Ocorreu um erro, tente novamente mais tarde")
        return deposit()
    }

    accountData.balance = parseFloat(ammount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        (`accounts/${accountName}.json`),
        JSON.stringify(accountData),
        function(err){console.log(err)},
    )
    console.log(`Foi depositado o valor de R$${ammount} na sua conta`)
}

function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta'
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if (!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(`Olá o saldo da sua conta é R$${accountData.balance}`)
        operation()
    
    }).catch((err)=>console.log(err))

}

function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta'   
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
            name:'ammount',
            message: 'Quanto você deseja sacar',
            }
        ]).then((answer)=>{
            const ammount = answer['ammount']
            
            removeAmmount(accountName,ammount)
        }).catch((err)=>console.log(err))

    }).catch((err)=>console.log(err))
}

function removeAmmount(accountName,ammount){
    const accountData = getAccount(accountName)

    if (!ammount){
        console.log("Ocorreu um erro, tente novamente mais tarde")
    }

    if(accountData.balance < ammount){
        console.log("Valor indisponivel")
        return withdraw()
    }

    accountData.balance = (parseFloat(accountData.balance) - parseFloat(ammount))
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),

    )
    console.log(`Foi realizado um saque de R$${ammount}`)
}
