const { getAllTasks } = require("../queries/tasks")
const { getAllMovies } = require("../queries/movies")

const checkTasks = async (req, res, next) => {
    const { movie_id } = req.params
    const allTasks = await getAllTasks(movie_id)
    if(allTasks[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error in: getAllTasks"})
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

const checkTaskName = (req, res, next) => {
    if(req.body.task_name){
        return next()
    }
    else{
        res.status(400).json({error: "task_name is required"})
    }
}

const checkTaskDescription = (req, res, next) => {
    if(req.body.description){
        return next()
    }
    else{
        res.status(400).json({error: "description is required"})
    }
}

const checkTaskIndex = async (req, res, next) =>{
    const {movie_id, id} = req.params
    const allTasks = await getAllTasks(movie_id)
    const ids = allTasks.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).json({error: "invalid task id"})
}

const checkCompletedBoolean = (req, res, next) => {
    const { completed } = req.body
    if (completed == "true" ||
        completed == "false" ||
        completed == undefined ||
        typeof completed == "boolean")
        return next()
    else
        res.status(400).json({ error: "completed must be a boolean value" })
}

module.exports = { checkTasks, 
                   checkTaskName,
                   checkTaskDescription,
                   checkTaskIndex,
                   checkMovieIndex,
                   checkCompletedBoolean }