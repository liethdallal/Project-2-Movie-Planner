<<<<<<< HEAD
=======
const Movie = require("../models/movieModel")
const movieData = require("../seed/movies.json")
>>>>>>> b47d31e (finished movie seeding. going to work on user seeding on saturday)
const User = require("../models/userModel")
const userData = require("../seed/user.json")

User.deleteMany({})
    .then(() => {
        return User.insertMany(userData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit();
    })
