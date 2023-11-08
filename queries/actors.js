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

//create
const createActor = async (actor) => {
    try {
        const newActor = await db.one("INSERT INTO actors(actor_name, actor_img, active, age, movie_id) VALUES(${actor_name}, ${actor_img}, ${active}, ${age}, ${movie_id}) RETURNING *",
        actor);
    } catch (error) {
        return error
    }
}

//delete
const deleteActor = async (id) => {
    try {
        const deletedActor = await db.one("DELETE FROM actors WHERE id=$1 RETURNING *", id);
        return deletedActor;
    } catch (error) {
        return error
    }
}

//update


module.exports = { getAllActors,
                   getOneActor  }