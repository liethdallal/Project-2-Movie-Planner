const express = require("express");
const router = express.Router()


// Import User Model
const User = require("../models/userModel");
// get
router.get("/:userName", async (req, res, next) => {
  try {
    // find user by username
    const userName = req.params.userName;
    const user = await User.findOne({userName: userName})

    // if the user does not exist 
    if(!user) {
      res.status(404).send("No user found")
    }
// return user dat
    res.redirect("/:userName", userName);
  } catch (error) {
    next(error)
  }
})

// Register user 

router.post("/register", async (req, res, next) => {
    try {
      // Check if the user exists
      const userExist = await User.findOne({email: req.body.email});
      if(userExist) {
        res.status(400).send("User already exist!")
      }



      // create a new user
      const newUser = await User.create({
        userName: req.params.userName,
        email: req.params.email,
        password: req.params.password,
        unwatchedMovies: req.params.unwatchedMovies,
        watchedMovies: req.params.watchedMovies
      });

      // Save the user to the database
      

      // success response
      res.redirect("/userSuccess", {newUser})

    } catch(error) {
      next(error);
    }
});

// Update user
router.put("/", async (req, res, next) => {
  try {
    const filter = {
      _userName: req.params.userName
    }
    const data = {
      userName: req.params.userName,
      email: req.params.email,
      password: req.params.password,
      unwatchedMovies: req.params.unwatchedMovies,
      watchedMovies: req.params.watchedMovies
    }
    const updatedUser = await User.findOneAndUpdate(filter, data, {new: true})
    res.redirect("/passwordUpdate", {updatedUser})
  } catch (error) {
    next(error)
  }
})

module.exports = router

