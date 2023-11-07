const express = require("express")
const actors = express.Router({ mergeParams: true })
const { getMovie } = require("../queries/movies")


// index, /movies/#/actors

// show, /movies/#/actors/:id

// new, /movies/#/actors

// delete /movies/#/actors/:id

// update /movies/#/actors/:id





module.exports = actors