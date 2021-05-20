const contact = require('./contact');


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
        contact.saveContact({
            name: argv.name,
            email: argv.email,
            phone: argv.phone,
        });
    }
}).demandCommand();

// List all of contact
yargs.command({
    command: 'list',
    describe: 'Show all of contact',
    handler() {
        contact.listContact();
    }
});

// Show detail a contact
yargs.command({
    command: 'detail',
    describe: 'Show detail a contact by name of contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.detailContact(argv.name);
    }
});

// Delete a contact
yargs.command({
    command: 'delete',
    describe: 'Delete a contact by name of contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contact.deleteContact(argv.name);
    }
});

yargs.parse();



