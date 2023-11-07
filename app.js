const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to Production Apprentice")
})

// const moviesController = require("./controllers/moviesController.js")
// app.use("/moviess", moviesController)
// const actorsController = require("./controllers/actorsController.js")
// app.use("/actors", tasksController)
// const tasksController = require("./controllers/tasksController.js")
// app.use("/actors", actorsController)

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app