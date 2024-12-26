console.log(process.argv)

const args = process.argv.slice(2)

console.log(args)

const nome = args[0].split("=")

console.log(nome)