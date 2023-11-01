# Project-2-Movie-Planner

# Project Description 
Our Movie Review and Watchlist Application is a web-based platform developed using Express, MongoDB, Mongoose, Node, EJS, and JavaScript. It provides users with the ability to sign in with their google account, save their data, maintain a watchlist, and contribute custom movie information.

# Picture of home page 

![Homepage pic](./Screenshot%202023-10-31%20at%208.22.46 PM.png)

# User Stories 
-As the user I would like to create an account to keep my data saved with all my changes

-As the user I want to be able to know if the movie i added has been added already to my watchlist 

-As a user I want to be able to add a movies I would like to watch

-As the user I want to be able to add my own movie title and image for the movie 

-I want to be able to search through the movies with a search bar

# MVP + Stretch Goals 
### MVP Goals
-A home page with full access to a list of movies the user added to his to-watch list

-A button to add movies that are not included in the application's database

-A search bar to search for individual movies from the database 

-No errors or user manipulation 


### Stretch Goals
-A review out of 5 for each movie for each personal user 

-A filter system for different genres of movies

-A sign-in method for the user to be able to save his data 

### List of Mongoose models and their properties
-A movie model that holds properties: 
  title: {type: String, required: true, unique: true},
  img: {type: String, required: true},
   
-A user model that holds properties: 
    name: String,
    email: String,
    unwatchedMovies: 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
    googleId: String
    timestamps: true

### List of Routes
For the user:
get
getbyId
post
put(update)


For the movies: 
get
getbyId
post


# Wireframe
![Wireframe pic](project2_wireframe.png)






