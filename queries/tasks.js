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

//create
const createTask = async (task) => {
    try {
        const createdTask = await db.one("INSERT INTO tasks (task_name, description, department, cost, completed, movie_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [task.task_name, task.description, task.department, task.cost, task.completed, task.movie_id]
        )
        return createdTask
    } catch (error) {
        return error
    }
}

//delete
const deleteTask = async (id) => {
    try {
        const deletedTask = await db.one(
            "DELETE FROM tasks WHERE id=$1 RETURNING *",
            [id]
        );
        return deletedTask;
    } catch (error) {
        return error;
    }
};

//update
const updateTask = async (id, task) => {
    try {
        const { task_name, description, department, cost, completed, movie_id } = task;
        const updatedTask = await db.one(
            "UPDATE tasks SET task_name=$1, description=$2, department=$3, cost=$4, completed=$5, movie_id=$6 WHERE id=$7 RETURNING *",
            [task_name, description, department, cost, completed, movie_id, id]
        );
        return updatedTask;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllTasks,
    getOneTask,
    createTask,
    deleteTask,
    updateTask
}