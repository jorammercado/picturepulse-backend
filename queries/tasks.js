const db = require("../db/dbConfig.js")

// index
const getAllTasks = async (movie_id) => {
    try{
        const allTasks = await db.any("SELECT * FROM tasks WHERE movie_id=$1",
        movie_id)
        return allTasks
    }
    catch (error) {
        return error
    }
}

// show
const getOneTask = async (id) => {
    try{
        const oneTask = await db.any("SELECT * FROM tasks WHERE id=$1",id)
        return oneTask
    }
    catch (error) {
        return error
    }
}

//delete

//create

//update

module.exports = { getAllTasks,
                   getOneTask  }