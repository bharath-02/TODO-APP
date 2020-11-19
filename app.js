// Import required packages
var express = require('express');
var todoController = require('./controllers/todoController');

// Create App
var app = express();

// Set up template engines
app.set('view engine', 'ejs');

// Create static files
app.use(express.static('./public'));

// Fire the controllers
todoController(app);
// Listen to port
app.listen(3300, () => {
    console.log('Listening to port 3300');
})