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

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the required fields', emptyFields });
  }

  // add a new workout to the database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
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
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const workout = await Workout.findById(id);

  // if there is no workout return an error
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  res.status(200).json(workout);
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // use shorthand method findByIdAndDelete(id), works the same as findOneAndDelete({ _id: id })
  const workout = await Workout.findByIdAndDelete(id);

  // if there is no workout return an error
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // update workout by id with the request body, return the new updated document
  const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

  // if there is no workout return an error
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
