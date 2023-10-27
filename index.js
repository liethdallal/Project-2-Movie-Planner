const express = require("express");
const mongoose = require("./db/connection");
const logger = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require("path");
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
require('./db/passport')

// Middleware
app.use(logger('dev')); // Logging middleware before other middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(ejsLayouts);

// Set up your view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const movieRouter = require("./controllers/moviecontroller");
const userRouter = require("./controllers/usercontroller");
const indexRouter = require("./controllers/indexcontroller");
app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);
// Serve static files - This should be placed before defining your routes.
app.use(express.static(__dirname + '/views'));

// Define your routes
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/profile', (req, res) => {
  res.render('profile.ejs');
});

app.get('/createaccount', (req, res) => {
  res.render('createaccount.ejs');
});

app.get('/review', (req, res) => {
  res.render('review.ejs');
});

app.get('/error', (req, res) => {
  res.render('error.ejs');
});

// Handle invalid requests with a 404 page
app.use(function (req, res) {
  res.status(404).send('Can\'t find that!');
});

// Start the server
app.listen(8000, () => {
  console.log('Listening!');
});

