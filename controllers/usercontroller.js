const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require('../db/passport'); 
const Movie = require("../models/movieModel")

function index(req, res, next) {
 
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
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




// router.patch("/", async (req, res, next) => {
//   try {
    
//     // First you will authenticate the use
//     // Get the userId from. deserializing the google token
//     // user = Then you will find the use by querying the DB
    
//     // then you will find the movie by using req.body i think?
//       // In movies.ejs you will add a form around Add To My List Button
//       // The path will be "/movies"
//       // And the input tag will have a name = "movieId" value = <%movie.id%>
//       // req.body.movieId
//       // Then you will find the movie by movieId
//       const movieId = req.query.movie._Id;
//       const movie = await Movie.findOne({ _id: movieId });

//       // Then you update user like this
//       user.unWatchedMovies.push(movie);
//       await user.save();


//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })


router.put("/", async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const user = await User.findOne({_id: req.user._id});
    
    const movieId = req.body.movieId;
   

    const movie = await Movie.findOne({ _id: movieId });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    user.unwatchedMovies.push(movie.id);
    await user.save();
    res.redirect(`/profile`)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





//Put method check if user is signed in; find user from database await user.find()  get acess token or its id JWT Token decode the acess token you get user id ++> we use this to find user fro database ====> get id of the movie 

module.exports = router;
