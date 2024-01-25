const express = require ('express')
const indexcontroller= require('../controllers/indexcontroller')
const router = express.Router()

router.get('/', indexcontroller.displayProfilePage)
  
  router.get('/auth/google', indexcontroller.login)
  
  
  // Google OAuth callback route
  router.get('/oauth2callback', indexcontroller.callBack)
  
  // OAuth logout route
  router.get('/logout', indexcontroller.logout)
  
    router.get('/profile', indexcontroller.renderProfilePage)

    router.get('/error', indexcontroller.displayErrorPage)
    
  module.exports = router