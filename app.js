const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create our Express app
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});


// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


// done! we export it so we can start the site in start.js
module.exports = app;
