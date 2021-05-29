const express = require('express');
const app = express();
const PORT = 3000;
const contact = require('./utils/contact');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// use ejs
app.set('view engine', 'ejs');

// Built in  middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser('secret'));
app.use(session({
    cookie: {
        maxAge: 6000
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req, res) => {
    const users = [
        {
            name: 'Muhammad Pauzi',
            email: 'mhdpauzi@gmail.com'
        },
        {
            name: 'Muhammad Sukri',
            email: 'mhdsukri@gmail.com'
        },
        {
            name: 'Muhammad Ilham',
            email: 'mhdilham@gmail.com'
        },
    ]
    res.render('index', {
        title: 'Home',
        name: 'Muhammad Pauzi',
        users
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact List',
        contacts: contact.loadContacts(),
        msg: req.flash('msg')
    });
});

app.get('/contact/create', (req, res) => {
    res.render('create', {
        title: 'From Create Contact',
        contact: undefined
    })
});

app.post('/contact/create',
    [
        body('name').custom((nameValue) => {
            // is name exists in contacts.json
            if (contact.getContactByName(nameValue)) {
                throw new Error('The name already registered, please enter another name!');
            }
            return true;
        }),
        body('email', 'The email must be valid email').isEmail(),
        check('phone', 'The Phone number must be an Indonesian format').isMobilePhone('id-ID'),
        body('phone').custom((phoneValue) => {
            // is phone exists in contacts.json
            if (contact.getContactByPhone(phoneValue)) {
                throw new Error('The phone number already registered, make sure the number is correct!');
            }
            return true;
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            req.flash('msg', 'Contact has been inserted');
            contact.createContact(req.body);
            res.redirect('/contact');
        } else {
            return res.render('create', {
                title: 'From Create Contact',
                errors: errors.array(),
                contact: {
                    data: req.body
                }
            });
        }
    });

app.get('/contact/:name', (req, res) => {
    res.render('detail', {
        title: 'Contact Details',
        contact: contact.getContactByName(req.params.name),
    });
});

// delete a contact
app.get('/contact/delete/:name', (req, res) => {
    const contactByName = contact.getContactByName(req.params.name);

    // is contact exist in contacts.json
    if (contactByName) {
        // delete
        contact.deleteContact(req.params.name);
        // redirect to contact list page
        res.redirect('/contact');
    } else {
        res.status(404);
        res.send('<h1>404</h1>');
    }
});

// update a contact
app.get('/contact/update/:name', (req, res) => {
    const contactByName = contact.getContactByName(req.params.name);
    // is contact exist in contacts.json
    if (contactByName) {
        res.render('update', {
            title: 'From Update Contact',
            contact: contactByName
        })
    } else {
        res.status(404);
        res.send('<h1>404</h1>');
    }
});

app.post('/contact/update',
    [
        body('name').custom((nameValue, { req }) => {
            if (nameValue !== req.body.oldName) {
                // is name exists in contacts.json
                if (contact.getContactByName(nameValue)) {
                    throw new Error('The name already registered, please enter another name!');
                }
            }
            return true;
        }),
        body('email', 'The email must be valid email').isEmail(),
        check('phone', 'The Phone number must be an Indonesian format').isMobilePhone('id-ID'),
        body('phone').custom((phoneValue, { req }) => {
            if (phoneValue !== req.body.oldPhone) {
                // is phone exists in contacts.json
                if (contact.getContactByPhone(phoneValue)) {
                    throw new Error('The phone number already registered, make sure the number is correct!');
                }
            }
            return true;
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            req.flash('msg', 'Contact has been updated');
            contact.updateContact(req.body);
            res.redirect('/contact');
        } else {
            return res.render('update', {
                title: 'From Update Contact',
                errors: errors.array(),
                contact: {
                    data: req.body
                }
            });
        }
    });


app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
