const { getAllActors } = require("../queries/actors")

const checkActors = async (req, res, next) => {
    const allActors = await getAllActors()
    if(allActors[0]){
        return next()
    }
    else{
        res.status(500).json({error: "server error in: getAllActors"})
    }
}

const checkActorName = (req, res, next) => {
    if(req.body.actor_name){
        return next()
    }
    else{
        res.status(400).json({error: "actor_name is required"})
    }
}

const checkActorIndex = async (req, res, next) =>{
    const allActors = await getAllActors()
    const {id} = req.params
    const ids = allActors.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
    res.status(404).redirect("/error - invalid actor id")
}

module.exports = { checkActors, checkActorName, checkActorIndex }