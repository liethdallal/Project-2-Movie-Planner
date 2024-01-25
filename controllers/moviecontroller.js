const express = require('express')
const router = express.Router()
const Movie = require('../models/movieModel')

async function displayAllMoviesPage(req, res, next) {
    try {
        let movies
        let userMovies = []
        if(req.query.title){
        const title = req.query.title
            movies = await Movie.find({ title: {$regex: title, $options: 'i'}})
        } else{
            movies = await Movie.find()
        }
        if (req.user) {
            userMovies = req.user.unwatchedMovies.map((movie) => movie._id.toString())
        }
        res.render('movies', { movies, userMovies })

    } catch (error) {
        res.render('error')
    }
}

//send new movie form
async function displayMovieForm (req, res, next) {
    try {
        res.render('newMovieForm')
    } catch (error) {
        next(error)
    }
}



//get movies by title 'movie', { movie: movie[0] }
async function getMovieByTitle(req, res, next){
    try {
        const title = req.params.title
        const movie = await Movie.findOne({ title: title })
        if (movie) {
            res.render('example', { movie })
        } else {
            res.render('example', { movie: null }) 
        }
    } catch (error) {
        next(error)
    }
}



//post new movies
 async function postNewMovie(req, res, next){
    try {
        const createdMovie = await Movie.create({
            title: req.body.title,
            img: req.body.img,
            watched: req.body.watched,
            rating: req.body.rating
        })
        res.redirect('/movies')
    } catch (error) {
        next(error)
    }
}




module.exports = {displayAllMoviesPage, displayMovieForm, getMovieByTitle, postNewMovie}