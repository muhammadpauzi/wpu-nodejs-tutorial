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

// question function
const question = (message) => {
    return new Promise((resolve, reject) => {
        rl.question(message, (response) => {
            resolve(response);
        });
    });
}

const saveContact = (data) => {
    // Get data and parse to json
    let contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const emailExists = contacts.find(contact => contact.data.email == data.email);
    if (data.email !== '') {
        // Is phone email already registered
        if (emailExists) {
            console.log(chalk.red.bold('Your email is already registered, please enter another email.'));
            return false;
        }

        // Is email valid
        if (!validator.isEmail(data.email)) {
            console.log(chalk.red.bold('Your email is not valid. please enter a valid email'));
            return false;
        }
    }

    const phoneExists = contacts.find(contact => contact.data.phone == data.phone);
    // Is phone number already registered
    if (phoneExists) {
        console.log(chalk.red.bold('Your phone number is already registered, please enter another phone number.'));
        return false;
    }

    // Is phone number valid
    if (!validator.isMobilePhone(data.phone, 'id-ID')) {
        console.log(chalk.red.bold('Your phone number is not valid. please enter a valid the indonesian phone number.'));
        return false;
    }


    // Push to contacts
    contacts.push({
        created_at: new Date(),
        data
    });

    // Convert to json file valid with .stringify() and save or write to file contacts.json
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(chalk.green.bold('Your data has been inserted to database.'));
}

module.exports = {
    saveContact,
    question
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