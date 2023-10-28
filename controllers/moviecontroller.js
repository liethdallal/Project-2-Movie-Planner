const express = require("express")
const router = express.Router()
// const { displayAllMovies } = require("../controllers/indexcontroller")

const Movie = require("../models/movieModel")
//get all movies

// router.get("/", displayAllMovies)

router.get("/", async (req, res, next) => {
    try {
        let movies
        if(req.query.title){
        console.log("hello");
        const title = req.query.title
            movies = await Movie.find({ title: {$regex: title, $options: 'i'}})
        } else{
            movies = await Movie.find()
        }
        // console.log(movies);
        res.render("movies", { movies })

        // res.render("movies", { movies })
        // res.json(movies)
    } catch (error) {
        next(error)
    }
})

//send new movie form
router.get("/newMovie", async(req, res, next) => {
    try {
        res.render("newMovieForm")
    } catch (error) {
        next(error)
    }
})


//send update movie form
router.get("/update", async(req, res, next) => {
    try {
        res.render("movies")
    } catch (error) {
        next(error)
    }
})


//get movies by title "movie", { movie: movie[0] }
router.get("/:title", async (req, res, next) => {
    try {
        console.log(req)
        const title = req.params.title;
        const movie = await Movie.findOne({ title: title });
        res.render("example", { movie })
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        console.log(req)
        const title = req.params.id;
        const movie = await Movie.findOne({ id: id });
    } catch (error) {
        next(error);
    }
});



//post new movies
router.post("/newMovie", async(req, res, next) => {

    try {
        const createdMovie = await Movie.create({
            title: req.body.title,
            img: req.body.img,
            watched: req.body.watched,
            rating: req.body.rating
        })
        res.redirect("/movies")
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
function isLoggedIn(req,res,next){
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}


module.exports = router