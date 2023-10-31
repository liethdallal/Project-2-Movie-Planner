const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const passport = require('../db/passport') 
const Movie = require('../models/movieModel')

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {}
  let sortKey = req.query.sort || 'name'
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err)
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    })
  })
}

router.get('/users', index)

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/profile',
    failureRedirect: '/'
  }
))

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout()
  res.redirect('/users')
})



router.put('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const user = await User.findOne({_id: req.user._id})
    const movieId = req.body.movieId
    const movie = await Movie.findOne({ _id: movieId })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    user.unwatchedMovies.push(movie.id)
    await user.save()
    res.redirect(`/profile`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


router.put("/profile/remove-movie", async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ _id: req.user._id });
    console.log(user)
    const movieId = req.body.movieId;
    console.log(movieId)
    // Remove the movie from the user's unwatchedMovies list
    user.unwatchedMovies = user.unwatchedMovies.filter((id) => id !== movieId);

    await user.save();
    res.redirect(`/profile`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports = router
