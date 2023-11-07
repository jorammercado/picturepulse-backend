const db = require("../db/dbConfig.js")

// index
const getAllMovies = async () => {
    try{
        const allMovies = await db.any("SELECT * FROM movies")
        return allMovies
    }
    catch (error) {
        return error
    }
}

// show
const getOneMovie = async (id) => {
    try {
            const oneMovie = await db.one("SELECT * FROM movies WHERE id=$1", id)
            return oneMovie
    }
    catch(error){
        return error
    }
}

//delete

//create

//update

module.exports = { getAllMovies, getOneMovie }