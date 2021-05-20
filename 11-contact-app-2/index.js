const { saveContact } = require('./contact');


// saveContact({
//     name: 'Unknown',
//     email: Math.ceil(Math.random() * 10000 + 5000) + 'unknown@gmail.com',
//     phone: '08' + Math.ceil(Math.random() * 9000000000 + 1000000000)
// })

const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add new contract',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            default: '',
            type: 'string'
        },
        phone: {
            describe: 'Phone number',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        saveContact({
            name: argv.name,
            email: argv.email,
            phone: argv.phone,
        })
    }
});

yargs.parse();



