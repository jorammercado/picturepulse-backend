const db = require("../db/dbConfig.js")

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

const getOneActor = async (id) => {
    try{
        const oneActor = await db.any("SELECT * FROM actors WHERE id=$1",id)
        return oneActor
    }
    catch (error) {
        return error
    }
}

const createActor = async (actor) => {
    try {
        const newActor = await db.one("INSERT INTO actors(actor_name, actor_img, active, age, movie_id) VALUES(${actor_name}, ${actor_img}, ${active}, ${age}, ${movie_id}) RETURNING *",
        actor);
    } catch (error) {
        return error
    }
}

const deleteActor = async (id) => {
    try {
        const deletedActor = await db.one("DELETE FROM actors WHERE id=$1 RETURNING *", id);
        return deletedActor;
    } catch (error) {
        return error
    }
}

const updateActor = async (id) => {
    try {
        const updatedActor = await db.one("UPDATE actors SET actor_name=$1, actor_img=$2, active=$3, age=$4, movie_id=$5 WHERE id=$6 RETURNING *",
        [actor_name, actor_img, active, age, movie_id, id]
    );
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllActors,
    getOneActor,
    createActor,
    deleteActor,
    updateActor
  }