const express = require("express")
const movies = express.Router()
const { getAllMovies, 
        getOneMovie } = require("../queries/movies")
const { checkMovies,
        checkMovieName,
        checkMovieIndex } = require("../validations/checkMovies")

const actorsController = require("./actorsController.js")
movies.use("/:movie_id/actors", actorsController)

const tasksController = require("./tasksController.js")
movies.use("/:movie_id/tasks", tasksController)


// index
movies.get("/", checkMovies, async  (req, res) => {
    const allMovies = await getAllMovies()
    if(req.query.order){
        allMovies.sort((a,b) => {
            if(req.query.order==="asc"||req.query.order==="desc"){
                if(a.movie_name.toLowerCase() < b.movie_name.toLowerCase())
                    return -1
                else if (a.movie_name.toLowerCase() > b.movie_name.toLowerCase())
                    return 1
                else
                    return 0
            }
        })
        if(req.query.order==="asc")
            res.json(allMovies)
        else if(req.query.order==="desc")
            res.json(allMovies.reverse())    
        else
            res.redirect('/order should be asc or desc')
    }
    else
        res.status(200).json(allMovies)
})

// show
movies.get("/:id", checkMovieIndex, async (req, res) => {
    const { id } = req.params
    const movie = await getOneMovie(id)
    res.json(movie)
})

// new
movies.get("/", async (req, res) => {
     
})
// delete

// update


module.exports = movies