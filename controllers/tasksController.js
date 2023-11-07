const express = require("express")
const tasks = express.Router({ mergeParams: true })
const { getMovie } = require("../queries/movies")
const { getAllTasks,
        getOneTask
      } = require("../queries/tasks")


// index, /movies/#/tasks


// show, /movies/#/tasks/:id

// new, /movies/#/tasks

// delete /movies/#/tasks/:id

// update /movies/#/tasks/:id


module.exports = tasks