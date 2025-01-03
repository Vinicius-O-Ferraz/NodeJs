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
        }

    })
    .catch((err)=> console.log(err))
}

function createAccount(){
    console.log(chalk.bgWhite.black('Congratulations on choosing our bank!'))
    console.log(chalk.bgWhite.black('Choose the settings of your account bellow:'))

}