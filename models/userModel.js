const mongoose = require(`../db/connection`)

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    unwatchedMovies: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'}],
    googleId: String
  }, {
    timestamps: true
  })

//prehook
UserSchema.pre('findOne', function(next){
  this.populate('unwatchedMovies')
  next()
})

UserSchema.pre('find', function(next){
  this.populate('unwatchedMovies')
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User

