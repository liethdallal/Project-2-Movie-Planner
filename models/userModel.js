const mongoose = require(`../db/connection`)

const factSchema = new mongoose.Schema({
    text: String,
    unwatchedMovies: [],
    watchedMovies: []
  }, {
    timestamps: true
  });
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    facts: [factSchema],
    googleId: String
  }, {
    timestamps: true
  });

const User = mongoose.model("User", UserSchema)

module.exports = User

