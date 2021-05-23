const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3000;


// Sampai penggunaan morgan
app.use(morgan('dev'));

// use ejs
app.set('view engine', 'ejs');

// Application level middleware
app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});

// Built in  middleware
app.use(express.static('public'))

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

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About'
    });
    // console.log('OK');
    // next();
});

// app.use((req, res, next) => {
//     console.log("This is a second middleware.");
//     next();
// });

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id}, Category : ${req.query.category}`);
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
