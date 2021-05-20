// Core modules
// Local modules
// Third party modules

// Core modules
const fs = require('fs');
// Local modules
const functions = require('./functions'); // Local modules (./ ../ -> Relative URL)

// console.log(functions)
// console.log(functions.getName('Pauzi'));
// console.log(functions.PI)
// console.log(functions.user.name)
// console.log(functions.user.age)
console.log(functions.user.getInfoUser())
console.log(new functions.DB)