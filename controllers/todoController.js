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
var itemOne = todoModel({ item: 'buy flowers' }).save((err) => {
    if (err) throw err;
    console.log('item saved');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [{ item: 'eat' }, { item: 'sleep' }, { item: 'code' }];

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        res.render('todo', { todos: data });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', (req, res) => {
        data = data.filter((todo) => {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json({ todos: data });
    });
};