const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require('../db/passport'); // Import Passport for Google OAuth
const Movie = require("../controllers/moviecontroller")

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}
router.get('/users', index);
// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));



// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/profile',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});

router.get("/:id", async (req, res, next) => {
  try {
      console.log(req)
      const id = req.params.id;
      const user = await User.findOne({ id: id });
      console.log(user)
      res.json(user)
  } catch (error) {
      next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.unwatchedMovies.push(movieId);

    await user.save();

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



module.exports = router;
