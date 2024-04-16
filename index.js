const http = require('http');


http.createServer(function (request, response) {
    if (request.url === '/about') {
        response.write('Welcome to the about page');
    } else if (request.url === '/contact') {
        response.write('Welcome to the contact page');
    } else {
        response.writeHead(404);
        response.write('404 Not Found!');
    }
    response.end();
}).listen(8000);