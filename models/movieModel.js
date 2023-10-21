const mongoose = require(`../db/connection`)

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    watched: {type: Boolean, default: false},
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
        default: 0
      }
}) 

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie