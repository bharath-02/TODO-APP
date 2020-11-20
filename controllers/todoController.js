var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0.lh3je.mongodb.net/todo?retryWrites=true&w=majority');

// Create a schema - this is just like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create a new model 
var todoModel = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var data = [{ item: 'eat' }, { item: 'sleep' }, { item: 'code' }];

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view engine(ejs)
        todoModel.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view engine(ejs) and pass it to mongodb 
        var newTodo = todoModel(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        todoModel.find({ item: req.params.item.replace(/\-/g, " ") }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
};