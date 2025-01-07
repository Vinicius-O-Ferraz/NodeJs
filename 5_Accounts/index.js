const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

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

        if(action === 'Criar conta'){
            createAccount()
        }else if(action === 'Consultar saldo'){
            getAccountBalance()
        }else if(action === 'Depositar'){
            deposit()
        } else if(action === 'Sacar'){
           withdraw()
        }else if(action === 'Sair'){
            console.log('Finalizando o atendimento')
            process.exit()
        }
    })
    .catch((err)=> console.log(err))
}

function createAccount(){
    console.log(chalk.green('Muito obrigado por escolher nosso banco!'))
    console.log(chalk.green('Escolha as configurações desta conta abaixo: '))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
    {
        name: 'accountName',
        message: "Escolha o nome de sua conta"   
    }
]).then(answer=>{

    const accountName = answer['accountName']
    console.info(accountName)

    if(!fs.existsSync('accounts')){
        fs.mkdirSync('accounts')
    }

    if(fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.red('This account already exists!'))
        buildAccount()
        return
    }

    fs.writeFileSync(`accounts/${accountName}.json`,
        '{"balance":0}',
         function(err)
    {
        console.log(chalk.red(err))
    }
)

    console.log(chalk.green("Your account has been created"))
    operation()


}).catch((err)=>console.log(chalk.red(err)))
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
        console.log(chalk.red('escolha outro nome'))
        return false
    }
    return true
}

function addAmount(accountName, ammount){
    const accountData = getAccount(accountName);


    if(!ammount){
        console.log(chalk.red("Ocorreu um erro, tente novamente mais tarde")) 
        return deposit()
    }

    accountData.balance = parseFloat(ammount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        (`accounts/${accountName}.json`),
        JSON.stringify(accountData),
        function(err){console.log(err)},
    )
    console.log(chalk.green(`Foi depositado o valor de R$${ammount} na sua conta`))
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
        console.log(chalk.green(`O saldo da sua conta é R$${accountData.balance}`))
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
        console.log(chalk.red("Ocorreu um erro, tente novamente mais tarde"))
    }

    if(accountData.balance < ammount){
        console.log(chalk.red("Valor indisponivel"))
        return withdraw()
    }

    accountData.balance = (parseFloat(accountData.balance) - parseFloat(ammount))
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
    )
    console.log(chalk.green(`Foi realizado um saque de R$${ammount}`))
}

operation()
