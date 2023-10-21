const express = require("express")
const router = express.Router()


const Movie = require("../models/movieModel")
//get all movies
router.get("/", async (req, res, next) => {
    try {
        const movies = await Movie.find()
        res.render("/movies", { movies })
    } catch (error) {
        next(error)
    }
})
//get movies by title "movie", { movie: movie[0] }
router.get("/:title", async (req, res, next) => {
    try {
        const title = req.params.title;
        const movie = await Movie.find({ title: title });

        if (movie.length > 0) {
            res.json(movie);
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
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
            img: req.body.image,
            watched: req.body.watched,
            rating: req.body.rating
        })
        res.render("/newmovie", { createdMovie })
    } catch (error) {
        next(error)
    }
})

//update movie by title
router.put("/", async(req, res, next) => {
    try {
        const filter = {
            _title: req.params.title
        }
        const data = {
            title: req.body.title,
            img: req.body.img,
            watched: req.body.watched,
            rating: req.body.rating
        }
        const updatedMovie = await Movie.findOneAndUpdate(filter, data, { new: true })
        res.redirect("/:id", {updatedMovie})
    } catch (error) {
        next(error)
    }
})

//delete movies
router.delete("/", async(req, res, next) => {
    try {
        await Movie.FindOneAndDelete({ title: title })
        res.redirect("/movies")
    } catch (error) {
        next(error)
    }
})

module.exports = router