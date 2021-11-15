const app = require('express')();

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('pages/index', {
        test: 'Salut',
    });
});

app.listen(8080);