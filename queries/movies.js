const db = require("../db/dbConfig.js");

// index
const getAllMovies = async () => {
  try {
    const allMovies = await db.any("SELECT * FROM movies");
    return allMovies;
  } catch (error) {
    return error;
  }
};

// show
const getOneMovie = async (id) => {
  try {
    const oneMovie = await db.one("SELECT * FROM movies WHERE id=$1", id);
    return oneMovie;
  } catch (error) {
    return error;
  }
};

//create
const createMovie = async (movie) => {
  try {
    const newMovie = await db.one(
      "INSERT INTO movies(movie_name, poster_link, studio, director, staring, overview, runtime, release_year, budget, current_balance, schedule, genre, in_production) VALUES(${movie_name}, ${poster_link}, ${studio}, ${director}, ${staring}, ${overview}, ${runtime}, ${release_year}, ${budget}, ${current_balance}, ${schedule}, ${genre}, ${in_production}) RETURNING *",
      movie
    );
    return newMovie;
  } catch (error) {}
};

//delete
const deleteMovie = async (id) => {
  try {
    const deletedMovie = await db.one(
      "DELETE FROM movies WHERE id=$1 RETURNING *",
      id
    );
    return deletedMovie;
  } catch (error) {
    return error;
  }
};

//update
const updateMovie = async (id, movie) => {
  try {
    const updatedMovie = await db.one(
      "UPDATE movies SET movie_name=${movie_name}, poster_link=${poster_link}, studio=${studio}, director=${director}, staring=${staring}, overview=${overview}, runtime=${runtime}, release_year=${release_year}, budget=${budget}, current_balance=${current_balance}, schedule=${schedule}, genre=${genre}, in_production=${in_production} WHERE id=${id} RETURNING *",
      { id, ...movie }
    );
    return updatedMovie;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  deleteMovie,
  updateMovie,
};
