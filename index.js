const express = require('express')
const mongoose = require('./db/connection')
const logger = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
require('./db/passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const movieRouter = require('./controllers/moviecontroller')
const userRouter = require('./controllers/usercontroller')
const indexRouter = require('./controllers/indexcontroller')


app.use(logger('dev')) 

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use(ejsLayouts)

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use('/movies', movieRouter)

app.use('/users', userRouter)

app.use('/', indexRouter)

app.use(express.static(__dirname + '/views'))

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/profile', (req, res) => {
  res.render('profile.ejs')
})


app.get('/error', (req, res) => {
  res.render('error.ejs')
})

app.use(function (req, res) {
  res.status(404).render('error.ejs')
})

app.listen(8000, () => {
  console.log('Listening! on port 8000 🔥')
})

