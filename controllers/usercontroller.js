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


async function addMovieToList(req, res, next) {
  try {
    const user = await User.findOne({_id: req.user._id})
    const movieId = req.body.movieId
    const movie = await Movie.findOne({ _id: movieId })
    user.unwatchedMovies.push(movie.id)
    await user.save()
    res.redirect(`/movies`)

  } catch (error) {
  res.render('error')
  }
}


 async function removeMovieFromList (req, res, next) {
  try {
    const userId = req.user._id
    const movieId = req.body.movieId
    const user = await User.findOne({ _id: userId })
    user.unwatchedMovies.pull(movieId)
    await user.save()
    res.redirect(`/profile`)
    
  } catch (error) {
    res.render('error')
  }
}

module.exports = {index, addMovieToList, removeMovieFromList}
