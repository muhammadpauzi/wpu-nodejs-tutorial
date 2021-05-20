function getName(name) {
    return `Hallo, My name is ${name}`;
}

const PI = 3.14;

const user = {
    name: 'Muhammad Pauzi',
    age: 16,
    // getName: () => {
    //     return this.name;
    // }
    // Or notation ES6
    getInfoUser() {
        return `Hallo, my name is ${this.name} and i'm ${this.age} years old.`;
    }
}

class DB {
    constructor() {
        console.log('This is a class DB');
    }
}

// Exports
// module.exports.getName = getName;
// module.exports.PI = PI;
// module.exports.user = user;
// module.exports.DB = DB;

// Or
module.exports = {
    getName,
    PI,
    user,
    DB
}

// Error
// module.exports = getName;
// module.exports = PI; 