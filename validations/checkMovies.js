const { getAllMovies } = require("../queries/movies")

const checkMovies = async (req, res, next) => {
    const allMovies = await getAllMovies()
    if(allMovies[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error - getAllMovies"})
    }
}

const checkMovieName = (req, res, next) => {
    if(req.body.movie_name){
        return next()
    }
    else{
        res.status(400).json({error: "movie_name is required"})
    }
}

const checkMovieIndex = async (req, res, next) =>{
    const allMovies = await getAllMovies()
    const {id} = req.params
    const ids = allMovies.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid movie id")
}

const checkInProductionBoolean = (req, res, next) => {
    const { in_production } = req.body
    if (in_production == "true" ||
        in_production == "false" ||
        in_production == undefined ||
        typeof in_production == "boolean")
        return next()
    else
        res.status(400).json({ error: "in_production must be a boolean value" })
}

module.exports = { checkMovies, 
                   checkMovieName, 
                   checkMovieIndex, 
                   checkInProductionBoolean }