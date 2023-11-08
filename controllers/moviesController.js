const express = require("express")
const movies = express.Router()
const { getAllMovies, 
        getOneMovie,
        createMovie,
        deleteMovie,
        updateMovie
    } = require("../queries/movies")
const { checkMovies,
        checkMovieName,
        checkMovieIndex } = require("../validations/checkMovies")

const actorsController = require("./actorsController.js")
movies.use("/:movie_id/actors", actorsController)

const tasksController = require("./tasksController.js")
movies.use("/:movie_id/tasks", tasksController)


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

movies.get("/:id", checkMovieIndex, async (req, res) => {
    const { id } = req.params
    const movie = await getOneMovie(id)
    res.json(movie)
})

movies.post("/", async (req, res) => {
     try {
        const movie = await createMovie(req.body);
        res.status(200).json(movie);
     } catch (error) {
        res.status(400).json({ error: "New movie not created." });
     }
});

movies.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await deleteMovie(id);
        if (deletedMovie) {
            res.status(200).json({success: true, payload: {data: deletedMovie}})
        } else {
            res.status(404).json({ error: "Movie not found."})
        }
    } catch (error) {
        res.send(err)
    }
})

movies.put("/:id", async (req, res) => {
    const { id } = req.params;
   const updatedMovie = await updateMovie(id, req.body);
   if (updatedMovie.id) {
    res.status(200).json(updatedMovie);
   }  else {
    res.status(404).json({ error: "Movie not found."})
   }
})

module.exports = movies