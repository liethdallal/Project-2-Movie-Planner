const express = require('express')
const router = express.Router()
const movieController = require('../controllers/moviecontroller')

router.get('/', movieController.displayAllMoviesPage)

router.get('/newMovie', movieController.displayMovieForm)

router.get('/:title',movieController.getMovieByTitle)

router.post('/newMovie', movieController.postNewMovie)


module.exports = router