const passport = require('passport')

function displayProfilePage(req, res) {
  res.redirect('/profile')
}

function login(req,res){
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  )(req,res)
} 


// Google OAuth callback route
function callBack(req,res){
  passport.authenticate(
    'google',
    {
      successRedirect : '/profile',
      failureRedirect : '/profile'
    }
  )(req, res)
}

// OAuth logout route
function logout(req, res) {
    req.logout(function(err) {
      if (err) {
        res.redirect('/error')
      } else {
        res.redirect('/')
      }
    })
  }

function renderProfilePage(req, res){
    res.render('profile.ejs')
  }

  function displayErrorPage(req,res) {
    res.render('error')
  }
  
module.exports = {displayProfilePage, renderProfilePage, login, callBack, logout, displayErrorPage}

