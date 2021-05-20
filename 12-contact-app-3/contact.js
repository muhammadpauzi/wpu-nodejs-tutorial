const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
const fileData = 'contacts.json';

const dataPath = path.join(dirPath, fileData);

// is folder data exists
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// is file contacts.json exists
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]');
}

// is file contacts.json is empty
if (fs.readFileSync(dataPath) == '') {
    fs.writeFileSync(dataPath, '[]');
}

const loadContacts = () => {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

const saveContact = (data) => {
    // Get data and parse to json
    let contacts = loadContacts();
    const nameExists = contacts.find(contact => contact.data.name.toLowerCase() == data.name.toLowerCase());
    // Is phone email already registered
    if (nameExists) {
        console.log(chalk.red.bold('The name is already registered, please enter another name.'));
        return false;
    }

    const emailExists = contacts.find(contact => contact.data.email == data.email);
    if (data.email !== '') {
        // Is phone email already registered
        if (emailExists) {
            console.log(chalk.red.bold('The email is already registered, please enter another email.'));
            return false;
        }

        // Is email valid
        if (!validator.isEmail(data.email)) {
            console.log(chalk.red.bold('The email is not valid. please enter a valid email'));
            return false;
        }
    }

    const phoneExists = contacts.find(contact => contact.data.phone == data.phone);
    // Is phone number already registered
    if (phoneExists) {
        console.log(chalk.red.bold('The phone number is already registered, please enter another phone number.'));
        return false;
    }

    // Is phone number valid
    if (!validator.isMobilePhone(data.phone, 'id-ID')) {
        console.log(chalk.red.bold('The phone number is not valid. please enter a valid the indonesian phone number.'));
        return false;
    }

    // Push to contacts
    contacts.push({
        created_at: new Date(),
        data
    });

    // Convert to json file valid with .stringify() and save or write to file contacts.json
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(chalk.green.bold('The data has been inserted to database.'));
}

const listContact = () => {
    let contacts = loadContacts();

    console.log(chalk.green.bold("List of Contact"));
    contacts.forEach((contact, i) => {
        console.log(`${chalk.green.bold(i + 1)}. ${contact.data.name} - ${contact.data.phone}`);
    });
}

const detailContact = (name) => {
    let contacts = loadContacts();

    const contact = contacts.find(contact => contact.data.name.toLowerCase() == name.toLowerCase());
    // is contact undefined ?
    if (!contact) {
        console.log(chalk.red.bold(`"${name}" is not found.`));
        return false;
    }

    console.log(chalk`{green Name :} ${contact.data.name}`);
    console.log(chalk`{green Email :} ${contact.data.email || '-'}`);
    console.log(chalk`{green Phone Number :} ${contact.data.phone}`);
}

const deleteContact = (name) => {
    const contacts = loadContacts();

    const newContacts = contacts.filter(contact => contact.data.name.toLowerCase() !== name.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.bold(`"${name}" is not found.`));
        return false;
    }

    fs.writeFileSync(dataPath, JSON.stringify(newContacts));
    console.log(chalk.green.bold(`Contact with the name "${name}" has been deleted.`));
}


module.exports = {
    saveContact,
    listContact,
    detailContact,
    deleteContact
}

// rl.question('Enter your name : ', name => {
//     rl.question('Enter your number phone : ', phone => {
//         // Get data and parse to json
//         let contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

//         // Push to contacts
//         contacts.push({
//             name,
//             phone
//         });

//         // Convert to json file valid with .stringify() and save or write to file contacts.json
//         fs.writeFileSync(dataPath, JSON.stringify(contacts));
//         console.log('Your data has been inserted to database.')
//         rl.close();
//     });
// });