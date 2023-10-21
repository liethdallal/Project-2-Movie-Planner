const mongoose = require(`../db/connection`)

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    unwatchedMovies: [],
    watchedMovies: []
});

const User = mongoose.model("User", UserSchema)

module.exports = User

