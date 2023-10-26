const express = require("express")
const router = express.Router()
// const { displayAllMovies } = require("../controllers/indexcontroller")

const Movie = require("../models/movieModel")
//get all movies

// router.get("/", displayAllMovies)

router.get("/", async (req, res, next) => {
    try {
        const movies = await Movie.find()
<<<<<<< HEAD
        main
        res.json(movies)
=======
        res.render("movies", { movies })
        // res.json(movies)
>>>>>>> 4ff8b65 (all of todays changes from Joel Lieth and Ryan)
    } catch (error) {
        next(error)
    }
})
//get movies by title "movie", { movie: movie[0] }
router.get("/:title", async (req, res, next) => {
    try {
        const title = req.params.title;
<<<<<<< HEAD
        const movie = await Movie.find({ title: title });

        if (movie.length > 0) {

            res.json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
=======
        const movie = await Movie.findOne({ title: title });
        res.render("movie", { movie })
>>>>>>> 4ff8b65 (all of todays changes from Joel Lieth and Ryan)
    } catch (error) {
        next(error);
    }
});

//send new movie form
router.get("/newMovie", async(req, res, next) => {
    try {
        res.render("/newmovie")
    } catch (error) {
        next(error)
    }
})

//send update movie form
router.get("/update", async(req, res, next) => {
    try {
        res.render("/updatemovie")
    } catch (error) {
        next(error)
    }
})

//post new movies
router.post("/", async(req, res, next) => {
    try {
        const createdMovie = await Movie.create({
            title: req.body.title,
            img: req.body.img,
            watched: req.body.watched,
            rating: req.body.rating
        })
        res.render("movie", { createdMovie })
        // res.json(createdMovie)
    } catch (error) {
        next(error)
    }
})

//update movie by title
router.put("/:title", async(req, res, next) => {
    try {
        const filter = {
            "title": req.params.title
        }
        const data = {
            title: req.body.title, //THIS line of code is where the error is spitting
            img: req.body.img,
            watched: req.body.watched,
            rating: req.body.rating
        }
        const updatedMovie = await Movie.findOneAndUpdate(filter, data, { new: true })
        // res.redirect("/:title", {updatedMovie})
        res.json(updatedMovie)
    } catch (error) {
        next(error)
    }
})

//delete movies
router.delete("/:title", async(req, res, next) => {
    try {
        const title = req.params.title
        await Movie.findOneAndDelete({ title: title })
        res.redirect("/movies")
    } catch (error) {
        next(error)
    }
})

module.exports = router