const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    // res.send('This is a Home Page.');
    // res.json({
    //     name: 'Muhammad Pauzi'
    // });
    res.sendFile('./index.html', {
        root: __dirname
    });
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {
        root: __dirname
    });
});

app.get('/product/:id', (req, res) => {
    // res.send(`Product ID : ${req.params.id}, Category : ${req.params.category}`);
    res.send(`Product ID : ${req.params.id}, Category : ${req.query.category}`);
    // res.sendFile('./about.html', {
    //     root: __dirname
    // });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
