const moment = require('moment');
const fs = require('fs');
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

const loadContacts = () => {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

const saveContact = (contact) => {
    // write to file contacts.json
    fs.writeFile(dataPath, JSON.stringify(contact), (err) => {
        if (err) throw err;
    });
}

const getContactByName = name => {
    // get all current data
    const contacts = loadContacts();
    // and get one data by name
    return contacts.find(contact => contact.data.name.toLowerCase() === name.toLowerCase());
}

const getContactByPhone = phone => {
    // get all current data
    const contacts = loadContacts();
    // and get one data by name
    return contacts.find(contact => contact.data.phone.toLowerCase() === phone.toLowerCase());
}

const createContact = (body) => {
    // get all current data
    const contacts = loadContacts();
    // Add form data to current data
    contacts.push(
        {
            created_at: moment().format('hh:mm DD/MM/yyyy'),
            data: body
        }
    );
    // and save ro write to file contacts.json
    saveContact(contacts);
}

const deleteContact = (name) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter(contact => contact.data.name.toLowerCase() !== name.toLowerCase());
    saveContact(newContacts);
}

const updateContact = (body) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter(contact => contact.data.name.toLowerCase() !== body.oldName.toLowerCase());
    const oldContact = contacts.find(contact => contact.data.name.toLowerCase() === body.oldName.toLowerCase());
    delete body.oldName;
    delete body.oldPhone;

    newContacts.push({
        created_at: oldContact.created_at,
        updated_at: moment().format('hh:mm DD/MM/yyyy'),
        data: body
    });

    saveContact(newContacts);
}
// const generateNewContact = () => {
//     const contacts = loadContacts();
//     const uniqueContact = Math.floor(Math.random() * 1000);
//     const name = "Unknown " + uniqueContact;
//     const email = "unknown" + uniqueContact + "@gmail.com";
//     const providers = ["21", "12", "52", "13", "22", "31", "38"];
//     const phone = "08" + providers[Math.floor(Math.random() * providers.length)] + Math.floor(Math.random() * 99999999);
//     contacts.push(
//         {
//             created_at: moment().format('hh:mm DD/MM/yyyy'),
//             data: {
//                 name: name,
//                 email: email,
//                 phone: phone
//             }
//         }
//     );
//     saveContact(contacts);
// }

module.exports = {
    loadContacts,
    getContactByName,
    getContactByPhone,
    createContact,
    deleteContact,
    updateContact
}