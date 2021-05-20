const { question, saveContact } = require('./contact');

const main = async () => {
    const name = await question("Enter your name : ");
    const email = await question("Enter your email : ");
    const phone = await question("Enter youe phone number too : ");

    saveContact({
        name,
        email,
        phone,
    });
}

main();








