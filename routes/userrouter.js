const express = require('express')
const router = express.Router()
const userController = require('../controllers/usercontroller')

router.get('/users', userController.index)

router.put('/', userController.addMovieToList)


router.put('/remove-movie', userController.removeMovieFromList)

module.exports = router
