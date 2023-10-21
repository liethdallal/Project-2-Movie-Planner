const express = require("express");
const router = express.Router()

// Import User Model
const User = require("../models/userModel");
// get
router.get("/:userName", async (req, res, next) => {
     try {
      const userName = req.params.userName
      const user = await User.find({ userName: userName})

      if (user.length > 0) {
        res.json(user)
      } else {
        res.status(404).json({ message: "User not found" })
      }
     } catch (error) {
      next(error)
     }
})

// Register user 
router.post("/createUser", async (req, res, next) => {
  try {
    const createdUser = await User.create({
        userName: req.params.userName,
        email: req.params.email,
        password: req.params.password,
        unwatchedMovies: req.params.unwatchedMovies,
        watchedMovies: req.params.watchedMovies
    })
    // res.render("/newUser", { createdUser })
    res.json(createdUser)
  } catch (error) {
    next(error)
  }
})

// Update user
router.put("/:userName", async (req, res, next) => {
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
    // res.redirect("/updatedUser", {updatedUser})
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})


module.exports = router
