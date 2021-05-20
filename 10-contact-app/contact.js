const fs = require('fs');
const readline = require('readline');
const path = require('path');

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

// Create interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


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

    // Push to contacts
    contacts.push({
        data
    });

    // Convert to json file valid with .stringify() and save or write to file contacts.json
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log('Your data has been inserted to database.');

    // Close rl.question 
    rl.close();
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