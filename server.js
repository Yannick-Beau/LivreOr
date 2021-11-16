// Inclure les dépendances
const { request, response } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flashMiddleware = require('./middlewares/flash');
const Message = require('./models/Message');

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
    Message.findAll((messages) => {
        response.render(
            'pages/index',
            {
                messages: messages,
            },
        );
    });
    
});
app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "Vous n'avez pas entré de message");
        response.redirect('/');
    } else {
        Message.create(request.body.message, () => {
            request.flash('success', "Merci ! Votre message à bien été enregistré");
            response.redirect('/');
        });
    }
});
app.get('/message/:id', (request, response) => {
    Message.find(request.params.id, (message) => {
        response.render('pages/showMessage', {
            message: message,
        });
    });
});

app.listen(8080);