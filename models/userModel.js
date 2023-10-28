const mongoose = require(`../db/connection`);
const Movie = require("./movieModel");

const factSchema = new mongoose.Schema({
    text: String,

  }, {
    timestamps: true
  });
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    unwatchedMovies: [{
      type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"}],
    // watchedMovies: [{
    //   type: mongoose.Schema.Types.ObjectId,
    // ref: "Movie"}],
    googleId: String
  }, {
    timestamps: true
  });

const User = mongoose.model("User", UserSchema)

module.exports = User

