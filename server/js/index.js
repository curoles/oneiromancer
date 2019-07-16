const express = require("express");
const app = express()
const port = 3000

// Define routes
app.use(express.static("client"));

// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//const http = require('http');
//
//const hostname = '127.0.0.1';
//const port = 3000;
//
//const server = http.createServer((req, res) => {
//  res.statusCode = 200;
//  res.setHeader('Content-Type', 'text/plain');
//  res.end('Hello World\n');
//});
//
//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});
//
//if ("serviceWorker" in navigator) {
//  console.log("Service worker is enabled in Navigator");
//}
