const express = require("express");
const movies = express.Router();
const {
  getAllMovies,
  getOneMovie,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../queries/movies");
const {
  checkMovies,
  checkMovieName,
  checkMovieIndex,
  checkInProductionBoolean,
} = require("../validations/checkMovies");

const actorsController = require("./actorsController.js");
movies.use("/:movie_id/actors", actorsController);

const tasksController = require("./tasksController.js");
movies.use("/:movie_id/tasks", tasksController);

movies.get("/", checkMovies, async (req, res) => {
  const allMovies = await getAllMovies();
  if (req.query.order) {
    allMovies.sort((a, b) => {
      if (req.query.order === "asc" || req.query.order === "desc") {
        if (a.movie_name.toLowerCase() < b.movie_name.toLowerCase()) return -1;
        else if (a.movie_name.toLowerCase() > b.movie_name.toLowerCase())
          return 1;
        else return 0;
      }
    });
    if (req.query.order === "asc") res.json(allMovies);
    else if (req.query.order === "desc") res.json(allMovies.reverse());
    else res.redirect("/order should be asc or desc");
  } else res.status(200).json(allMovies);
});

movies.get("/:id", checkMovieIndex, async (req, res) => {
  const { id } = req.params;
  const movie = await getOneMovie(id);
  res.json(movie);
});

movies.post("/", checkMovieName, checkInProductionBoolean, async (req, res) => {
  try {
    const movie = req.body;
    movie.poster_link = !movie.poster_link ? "" : movie.poster_link;
    movie.studio = !movie.studio ? "" : movie.studio;
    movie.director = !movie.director ? "" : movie.director;
    movie.staring = !movie.staring ? "" : movie.staring;
    movie.overview = !movie.overview ? "" : movie.overview;
    movie.runtime = !movie.runtime ? 0 : movie.runtime;
    movie.release_year = !movie.release_year ? 1990 : movie.release_year;
    movie.budget = !movie.budget ? 0 : movie.budget;
    movie.current_balance = !movie.current_balance ? 0 : movie.current_balance;
    movie.schedule = !movie.schedule ? "" : movie.schedule;
    movie.genre = !movie.genre ? "" : movie.genre;
    movie.in_production = !movie.in_production ? false : movie.in_production;
    const movieAdded = await createMovie(movie);
    res.status(200).json(movieAdded);
  } catch (error) {
    res.status(400).json({ error: "New movie not created." });
  }
});

movies.delete("/:id", checkMovieIndex, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await deleteMovie(id);
    if (deletedMovie) {
      res.status(200).json({ success: true, payload: { data: deletedMovie } });
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res.send(err);
  }
});

movies.put(
  "/:id",
  checkMovieName,
  checkMovieIndex,
  checkInProductionBoolean,
  async (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    movie.poster_link = !movie.poster_link ? "" : movie.poster_link;
    movie.studio = !movie.studio ? "" : movie.studio;
    movie.director = !movie.director ? "" : movie.director;
    movie.staring = !movie.staring ? "" : movie.staring;
    movie.overview = !movie.overview ? "" : movie.overview;
    movie.runtime = !movie.runtime ? 0 : movie.runtime;
    movie.release_year = !movie.release_year ? 1990 : movie.release_year;
    movie.budget = !movie.budget ? 0 : movie.budget;
    movie.current_balance = !movie.current_balance ? 0 : movie.current_balance;
    movie.schedule = !movie.schedule ? "" : movie.schedule;
    movie.genre = !movie.genre ? "" : movie.genre;
    movie.in_production = !movie.in_production ? false : movie.in_production;
    const updatedMovie = await updateMovie(id, movie);
    if (updatedMovie.id) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  }
);

module.exports = movies;
