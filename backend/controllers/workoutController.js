const Workout = require("../models/workoutModel")
const recordsCount = require("../models/recordsCount")
const mongoose = require("mongoose")

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user_id
    const workouts = await Workout.find({user_id:user_id}).sort({"createdAt": -1})
    res.status(200).json(workouts)
}

// get single workouts
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)
}

// create new single workouts
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if (!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill all the fields '+ emptyFields,emptyFields})
    }

    //add doc to db
    try {
        const user_id = req.user_id
        const workout = await Workout.create({
            title, load, reps, user_id
        })
       
        await recordsCount.updateOne({"collectionName":"Workouts"},{$inc:{count:1}})

        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// delete single workouts
const deleteWorkout = async(req,res) =>{
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)
}


// update a workout
const updateWorkout = async(req,res)=>{
    const{id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" })
    }

    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if (!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill all the fields : '+ emptyFields,emptyFields})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: "No such workout" })
    }
    res.status(200).json(workout)

}



module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}