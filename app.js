const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
require('dotenv').config();

const port = process.env.PORT || 1337;

const connectDB = require('./config/db');
connectDB();

const router = require("./routes/route");
const user = require("./routes/users");

const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.set("views", "./views");

app.use('/', router);
app.use('/', user);

// app.get('*', (req, res) => {
//   res.status(404).render('404', {'title': 'Error'});
// });

app.listen(port);