const express = require("express")
const movies = express.Router()

// INDEX
movies.get("/", (req, res) => {
  res.json({ status: "ok" })
});

module.exports = movies