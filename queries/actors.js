const db = require("../db/dbConfig.js")

// index
const getAllActors = async (movie_id) => {
    try{
        const allActors = await db.any("SELECT * FROM actors WHERE movie_id=$1",
        movie_id)
        return allActors
    }
    catch (error) {
        return error
    }
}

// show
const getOneActor = async (id) => {
    try{
        const oneActor = await db.any("SELECT * FROM actors WHERE id=$1",id)
        return oneActor
    }
    catch (error) {
        return error
    }
}

//delete

//create

//update

module.exports = { getAllActors,
                   getOneActor  }