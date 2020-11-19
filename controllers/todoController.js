var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding ass' }];

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        res.render('todo', { todos: data });
    })

    app.post('/todo', (req, res) => {

    })

    app.delete('/todo', (req, res) => {

    })
};