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
        title: 'From Create Contact'
    })
});

app.post('/contact/create',
    [
        body('name').custom((nameValue) => {
            // is name exists in contacts.json
            if (contact.getContactByName(nameValue)) {
                throw new Error('The name already registered, please enter another name');
            }
            return true;
        }),
        body('email', 'The email must be valid email').isEmail(),
        check('phone', 'The Phone number must be an Indonesian format').isMobilePhone('id-ID')
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render('create', {
                title: 'From Create Contact',
                errors: errors.array(),
            });
        } else {
            req.flash('msg', 'Contact has been inserted');
            contact.createContact(req.body);
            res.redirect('/contact');
        }
    });

app.get('/contact/:name', (req, res) => {
    res.render('detail', {
        title: 'Contact Details',
        contact: contact.getContactByName(req.params.name),
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
