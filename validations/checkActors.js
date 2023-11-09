const { getAllActors } = require("../queries/actors")
const { getAllMovies } = require("../queries/movies")

const checkActors = async (req, res, next) => {
    const { movie_id } = req.params
    const allActors = await getAllActors(movie_id)
    if(allActors[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error in: getAllActors"})
    }
}

const checkMovieIndex = async (req, res, next) => {
    const allMovies = await getAllMovies()
    const { movie_id } = req.params
    const movieIds = allMovies.map(e => e.id)
    if (movieIds.includes(Number(movie_id)))
        return next()
    else
        res.status(404).redirect("/error - invalid movie id")
}

const checkActorName = (req, res, next) => {
    if(req.body.actor_name){
        return next()
    }
    else{
        res.status(400).json({error: "actor_name is required"})
    }
}

const checkActorIndex = async (req, res, next) =>{
    const { movie_id, id } = req.params
    const allActors = await getAllActors(movie_id)
    const ids = allActors.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid actor id of specific movie")
}

const checkMovieName = (req, res, next) => {
    if (req.body.artist)
        return next()
    else
        res.status(400).json({ error: "movie name is required" })
}

const checkActiveBoolean = (req, res, next) => {
    const { active } = req.body
    if (active == "true" ||
        active == "false" ||
        active == undefined ||
        typeof active == "boolean")
        return next()
    else
        res.status(400).json({ error: "active must be a boolean value" })
}

module.exports = { checkActors, 
                   checkActorName, 
                   checkActorIndex, 
                   checkMovieIndex, 
                   checkMovieName, 
                   checkActiveBoolean }