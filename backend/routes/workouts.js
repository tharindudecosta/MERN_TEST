const express= require("express");

const {createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router()

//requrie auth for all workout routes
router.use(requireAuth)

// Get all workouts
router.get("/",getWorkouts)

// Get a single workout
router.get("/:id",getWorkout)

//POST a new workout
router.post("/",createWorkout)

//Delete a workout
router.delete("/:id",deleteWorkout)

//Update a new workout
router.patch("/updateWorkout/:id",updateWorkout)

module.exports = router
