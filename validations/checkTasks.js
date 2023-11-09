const { getAllTasks } = require("../queries/tasks")

const checkTasks = async (req, res, next) => {
    const allTasks = await getAllTasks()
    if(allTasks[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error in: getAllTasks"})
    }
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
    const {movie_id} = req.params
    const allTasks = await getAllTasks(movie_id)
    const {id} = req.params
    const ids = allTasks.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid task id")
}

module.exports = { checkTasks, 
                   checkTaskName,
                   checkTaskDescription,
                   checkTaskIndex }