const express = require("express")
const actors = express.Router({ mergeParams: true })
const { getMovie } = require("../queries/movies")

const { getAllActors,
        getOneActor,
        createActor,
        deleteActor,
        updateActor
      } = require("../queries/actors")

const { checkActors,
        checkActorName,
        checkActorIndex
      } = require("../validations/checkActors.js")

const { checkMovieIndex 
} = require("../validations/checkMovies.js")


actors.get("/", checkActors, checkMovieIndex, async (req, res) => {
    const { movie_id } = req.params
    const movie = await getMovie(movie_id)
    let allActors = await getAllActors(movie_id)
    if (req.query.order) {
        allActors.sort((a, b) => {
            if (req.query.order === "asc" || req.query.order === "desc") {
                if (a.actor_name.toLowerCase() < b.actor_name.toLowerCase())
                    return -1
                else if (a.actor_name.toLowerCase() > b.actor_name.toLowerCase())
                    return 1
                else
                    return 0
            }
            else if (req.query.order === "ascAge" || req.query.order === "descAge") {
                if (a.age < b.age)  
                    return -1
                else if (a.age > b.age)
                    return 1
                else
                    return 0
            }
        })
        if (req.query.order === "asc" || req.query.order === "ascAge" )
            res.json({ ...movie, allActors })
        else if (req.query.order === "desc" || req.query.order === "descAge" ) {
            allActors = allActors.reverse()
            res.json({ ...movie, allActors })
        }
        else
            res.redirect('/order should be asc, ascAge, desc or descAge')
    }
    else if (req.query.active) {
        if (req.query.active === "true") {
            allActors = allActors.filter(current => {
                return current.active === true
            })
            res.json({ ...movie, allActors })
        }
        else if (req.query.active === "false") {
            allActors = allActors.filter(current => {
                return current.active === false
            })
            res.json({ ...movie, allActors })
        }
        else
            res.redirect('/active key should be true or false')
    }
    else{
        res.json({ ...movie, allActors })
    }
})

actors.get("/:id", checkMovieIndex, checkActorIndex, async (req, res) => {
    const { movie_id, id } = req.params
    const actor = await getOneActor(id)
    res.json(actor)
})

actors.post("/", checkMovieIndex, async (req, res) => {
    const { movie_id } = req.params;
    const actorData = req.body;
    actorData.movie_id = movie_id;
    const newActor = await createActor(actorData);
    res.status(200).json(newActor);
})

actors.delete("/:actor_id", checkMovieIndex, checkActorIndex, async (req, res) => {
    const { actor_id } = req.params;
    const deletedActor = await deleteActor(actor_id);
    if (deletedActor) {
        res.status(200).json(deletedActor);
    } else {
        res.status(404).json({ error: "Actor not found" });
    }
} );

actors.put("/:id", checkMovieIndex, checkActorIndex, async (req, res) => {
    const { id } = req.params;
    const updatedActorData = req.body;
    const updatedActor = await updateActor(id, updatedActorData);
        if (updatedActor) {
            res.status(200).json(updatedActor);
        } else {
            res.status(404).json({ error: " Actor not found"});
        }
});

module.exports = actors