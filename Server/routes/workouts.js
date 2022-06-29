const express = require('express');
const {
  getWorkouts,
  createWorkout,
  getWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// POST a new workout
router.post('/', createWorkout);

// Get a single workout
router.get('/:id', getWorkout);

// DELETE a workout
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete a workout' });
});

// UPDATE a workout
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a workout' });
});

module.exports = router;
