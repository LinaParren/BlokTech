const express = require('express')
const { engine } = require('express-handlebars');
const app = express();

const path = require('path');
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

app.get('/zoeken', (req, res) => {
  res.render('zoeken');
});

app.get('/verkennen', (req, res) => {
  res.render('verkennen');
});

app.listen(3000);