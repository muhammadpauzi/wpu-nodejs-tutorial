const http = require('http');
const fs = require('fs');

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('File not found.');
        } else {
            res.write(data);
        }
        res.end();
    });
}

// Create server
const server = http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    // if (url === '/' || '/home') {
    //     renderHTML('./index.html', res);
    // } else if (url === '/about') {
    //     renderHTML('./about.html', res);
    // } else {
    //     res.write('<h1>Hello World.</h1>');
    //     res.end();
    // }

    switch (url) {
        case '/':
            renderHTML('./index.html', res);
            break;
        case '/about':
            renderHTML('./about.html', res);
            break;
        default:
            res.write('<h1>Hello World.</h1>');
            res.end();
    }
});

// Listen
server.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});