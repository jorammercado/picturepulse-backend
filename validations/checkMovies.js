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
        res.status(400).json({error: "artist_name is required"})
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

module.exports = { checkMovies, checkMovieName, checkMovieIndex }