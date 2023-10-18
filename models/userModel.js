const mongoose = require(`mongoose`)

const User = new mongoose.Schema({
    userName: {type: String, require: true},
    email: {type: String, require: true, unique: true}, 
    password: {type: String, require: true}
})

module.exports = { User }