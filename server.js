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
const movieRouter = require('./routes/movierouter')
const userRouter = require('./routes/userrouter')
const indexRouter = require('./routes/indexrouter')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



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
app.use(express.static(__dirname + '/views'))

app.use('/', indexRouter)
app.use('/movies', movieRouter)
app.use('/users', userRouter)
app.use((err, req, res, next) => {
  res.render('error');
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log('Listening!🔥')
})

