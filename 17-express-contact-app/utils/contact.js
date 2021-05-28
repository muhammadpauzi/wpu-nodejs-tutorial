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

const getContactByName = name => {
    // get all current data
    const contacts = loadContacts();
    // and get one data by name
    return contacts.find(contact => contact.data.name.toLowerCase() === name.toLowerCase());
}

const saveContact = (contact) => {
    // write to file contacts.json
    fs.writeFile(dataPath, JSON.stringify(contact), (err) => {
        if (err) throw err;
    });
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

module.exports = {
    loadContacts,
    getContactByName,
    createContact
}