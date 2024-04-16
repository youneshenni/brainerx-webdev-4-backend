const http = require('http');


http.createServer(function (request, response) {
    const routes = [
        {
            path: '/', handlerFunction: function (request, response) {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Welcome to the homepage!');
            }
        },
        {
            path: '/about', handlerFunction: function (request, response) {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Welcome to the about page!');
            }
        },
        {
            path: '/contact', handlerFunction: function (request, response) {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Welcome to the contact page!');
            }
        },
    ]

    const path = request.url;
    const chosenRoute = routes.find(function (route) { return (route.path === path) });
    if (chosenRoute) {
        chosenRoute.handlerFunction(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
}).listen(8000);