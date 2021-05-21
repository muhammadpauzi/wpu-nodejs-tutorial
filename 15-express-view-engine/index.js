const express = require('express');
const app = express();
const PORT = 3000;

// use ejs
app.set('view engine', 'ejs');

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

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id}, Category : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
