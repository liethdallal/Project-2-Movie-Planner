const router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/profile');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/login'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) {
        // Handle the error, e.g., show an error message or redirect to an error page.
        res.redirect('/error');
      } else {
        // Redirect the user to a different page after logging out, e.g., the home page.
        res.redirect('/');
      }
    });
  });

module.exports = router;