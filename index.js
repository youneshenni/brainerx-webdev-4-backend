// Initialize HTTP server with Node.js
// Import required modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {
    response.write('Hello World!'); // Write a response to the client
    response.end(); // End the response
}).listen(8000);