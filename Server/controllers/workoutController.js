const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutModel');

// get all workouts
const getWorkouts = async (req, res) => {
  // get all workouts from the database, sort by date in descending order
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // add a new workout to the database
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  const workout = await Workout.findById(id);

  // if there is no workout return an error
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  res.status(200).json(workout);
};

// delete a workout

// update a workout

module.exports = {
  getWorkouts,
  createWorkout,
  getWorkout,
};
