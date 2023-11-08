const express = require("express")
const tasks = express.Router({ mergeParams: true })
const { getMovie } = require("../queries/movies")

const { getAllTasks,
        getOneTask,
        createTask,
        deleteTask,
        updateTask
      } = require("../queries/tasks")

const { checkTasks,
        checkTaskName,
        checkTaskDescription,
        checkTaskIndex
      } = require("../validations/checkTasks.js")

const { checkMovieIndex 
} = require("../validations/checkMovies.js");
const { deleteTask } = require("../queries/tasks");

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
        res.json({ ...movie, allTasks })
    }
})

tasks.get("/:id", checkMovieIndex, checkTaskIndex, async (req, res) => {
    const { movie_id, id } = req.params
    const task = await getOneTask(id)
    res.json(task)
})

tasks.post("/", async (req, res) => {
    try {
        const createdTask = await createTask(req.body);
        res.status(200).json(createdTask);
    } catch (error) {
        res.status(400).json({ error: "Task not created.." });
    }
});

tasks.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteTask(id);
        if (deletedTask) {
            res.status(200).json({ success: true, payload: deletedTask });
        } else {
            res.status(404).json("Task not found.");
        }
    } catch (error) {
        res.status(err)
    }
});

tasks.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedTask = await updateTask(id, req.body);
    if (updatedTask.id) {
        res.status(200).json(updatedTask);
    } else {
        res.status(404).json("No task found with that id");
    }
});

module.exports = tasks