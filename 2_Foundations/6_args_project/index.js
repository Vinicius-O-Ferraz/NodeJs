const minimist = require("minimist")

const sum = require('./sum').sum

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])
sum(a,b)