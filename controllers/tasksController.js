const express = require("express")
const tasks = express.Router({ mergeParams: true })
const { getMovie } = require("../queries/movies")

const { getAllTasks,
        getOneTask
      } = require("../queries/tasks")

const { checkTasks,
        checkTaskName,
        checkTaskDescription,
        checkTaskIndex
      } = require("../validations/checkTasks.js")

const { checkMovieIndex 
} = require("../validations/checkMovies.js")

// index, /movies/#/tasks
tasks.get("/", checkTasks, checkMovieIndex, async (req, res) => {
    const { movie_id } = req.params
    const movie = await getMovie(movie_id)
    let allTasks = await getAllTasks(movie_id)
    if (req.query.order) {
        allTasks.sort((a, b) => {
            if (req.query.order === "asc" || req.query.order === "desc") {
                if (a.task_name.toLowerCase() < b.task_name.toLowerCase())
                    return -1
                else if (a.task_name.toLowerCase() > b.task_name.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if (req.query.order === "ascDept" || req.query.order === "descDept") {
                if (a.department.toLowerCase() < b.department.toLowerCase())
                    return -1
                else if (a.department.toLowerCase() > b.department.toLowerCase())
                    return 1
                else
                    return 0
            }
        })
        if (req.query.order === "asc" || req.query.order === "ascDept" )
            res.json({ ...movie, allTasks })
        else if (req.query.order === "desc" || req.query.order === "descDept" ) {
            allTasks = allTasks.reverse()
            res.json({ ...movie, allTasks })
        }
        else
            res.redirect('/order should be asc, ascDept, desc or descDept')
    }
    else if (req.query.completed) {
        if (req.query.completed === "true") {
            allTasks = allTasks.filter(current => {
                return current.completed === true
            })
            res.json({ ...movie, allTasks })
        }
        else if (req.query.completed === "false") {
            allTasks = allTasks.filter(current => {
                return current.completed === false
            })
            res.json({ ...movie, allTasks })
        }
        else
            res.redirect('/completed key should be true or false')
    }
    else{
        /*******************************/
        /***** main functionality ******/
        res.json({ ...movie, allTasks })
        /*******************************/
    }
})

// show, /movies/#/tasks/:id
tasks.get("/:id", checkMovieIndex, checkTaskIndex, async (req, res) => {
    const { movie_id, id } = req.params
    const task = await getOneTask(id)
    res.json(task)
})

// new, /movies/#/tasks

// delete /movies/#/tasks/:id

// update /movies/#/tasks/:id


module.exports = tasks