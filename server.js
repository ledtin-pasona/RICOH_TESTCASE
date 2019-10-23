// Require packages and set the port
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();
const {run} = require('./test.js');
 
// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
 
app.get('/test', (request, response) => {
    
    response.send({
        message: run()
    });
});
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});