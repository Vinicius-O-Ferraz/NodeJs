import chalk from "chalk";
import inquirer from "inquirer";

inquirer.prompt(
[
{
    name:'p1',
    message:"Qual o seu nome: "
},
{
    name:'p2',
    message:"Qual o sua idade: "
}  
]).then((answers)=>{
    console.log(chalk.black.bgYellow(`Seu nome é ${answers.p1}`));
    console.log(chalk.black.bgYellow(`Sua idade é de ${answers.p2} anos`));
}).catch((err) => console.log(err))
