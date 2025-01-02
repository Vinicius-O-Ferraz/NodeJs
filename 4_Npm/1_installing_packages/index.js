const lodash = require('lodash')
const chalk = require('chalk')

const a = [1,2,3,4,5]
const b = [2,4,5,7,8]

const diff = lodash.difference(a,b)

console.log(chalk.red.bold(diff))