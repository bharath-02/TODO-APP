// Import required packages
var express = require('express');

// Create App
var app = express();

// Set up template engines
app.set('view engine', 'ejs');

// Create static files
app.use(express.static('./public'));

// Listen to port
app.listen(3300, () => {
    console.log('Listening to port 3300');
})