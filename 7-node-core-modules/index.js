const fs = require('fs');

// sync
// try {
//     fs.writeFileSync('data/test.txt', 'Hello world secara sync.');
// } catch (err) {
//     console.log(err);
// }

// Sync
// const data = new Uint8Array(Buffer.from('Hello world secara async.'));
// fs.writeFile('data/test.txt', data, err => {
//     if (err) throw err;
//     console.log('The file has been saved.');
// });

// Test async (non blocking)
// const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo accusamus facere incidunt, placeat magnam earum nostrum molestias saepe aliquam at magni consectetur necessitatibus. Neque fuga magnam perspiciatis sapiente facere.';

// console.log('Start');
// fs.writeFile('data/test.txt', lorem, err => {
//     if (err) throw err;
//     console.log('The file has been saved.');
// });
// console.log('End');

// Sync
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data.toString());
// console.log(data);

// Async
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });



// Readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter your name : ', name => {
    rl.question('Enter your number phone : ', numPhone => {
        // console.log(`Hai ${name}, and your number is ${numPhone}`);
        // Get data and parse to json
        let contacts = JSON.parse(fs.readFileSync('data/contacts.json', 'utf-8'));


        // Push to contacts
        contacts.push({
            name,
            numPhone
        });

        // Convert to json file valid with .stringify() and save or write to file contacts.json
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('Your data has been inserted to database.')
        rl.close();
    });
});








