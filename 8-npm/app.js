// Third party module
const validator = require('validator');
const chalk = require('chalk');
// console.log(validator.isEmail('mhdpauzi@ggmail.com')) // True
// console.log(validator.isEmail('mhdpauzi@ggmail.c')) // False

// console.log(validator.isMobilePhone('12345', 'id-ID')) // False
// console.log(validator.isMobilePhone('082165688820', 'id-ID')) // True
// console.log(validator.isMobilePhone('+6282165688820', 'id-ID')) // True

// console.log(validator.isNumeric('1234A')); // False
// console.log(validator.isNumeric('12345')); // True


// Chalk
const name = 'Pauzi'
// console.log(chalk.black.bold.bgBlue('Hello World'));
const message = chalk`Hello!!, this's a sample text for trying package {bgGreen.black chalk}. My name's {green ${name}}`;

console.log(message)
