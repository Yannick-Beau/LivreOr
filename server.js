// Inclure les dépendances
const { request, response } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flashMiddleware = require('./middlewares/flash');

// Moteur de template
app.set('view engine', 'ejs');

// Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false},
}));
app.use(flashMiddleware);

// Routes
app.get('/', (request, response) => {
    if (request.session.error) {
        response.locals.error = request.session.error;
        request.session.error = '';
    }
    response.render('pages/index');
});
app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "Vous n'avez pas entré de message");
        response.redirect('/');
    }
});

app.listen(8080);