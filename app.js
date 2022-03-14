const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const path = require('path')
require('dotenv').config();

const port = process.env.PORT || 1337

const connectDB = require('./config/db.js')

connectDB();

const bodyparser = require('body-parser');
app.use(bodyparser.json());
const urlencodedparser = bodyparser.urlencoded({ extended: false})

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));

app.set('view engine', '.hbs');
app.set("views", "./views");

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/start', (req, res) => {
  res.render('start');
});

app.get('/zoeken', (req, res) => {
  res.render('zoeken');
});

app.get('/verkennen', (req, res) => {
  res.render('verkennen');
});

app.get('/inloggen', (req, res) => {
  res.render('inloggen');
});
app.post('/login', urlencodedparser, (req, res) => {
  res.send("Gebruikersnaam: " + req.body.username + "Password: " + req.body.password)
})

// res.redirect, waarde username

app.get('/accountmaken', (req, res) => {
  res.render('accountmaken');
});
app.post('/aangemaakt', urlencodedparser, (req, res) => {
  res.send("Voornaam: " + req.body.voornaam + 
            "Achternaam: " + req.body.achternaam +
            "E-mailadres: " + req.body.email +
            "Wachtwoord: " + req.body.wachtwoord)
})

app.get('/lijst', (req, res) => {
  res.render('lijst');
});

app.listen(port);