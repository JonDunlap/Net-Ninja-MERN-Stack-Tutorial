const express = require('express');
const {
  getWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// authenticate user before accessing workouts
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// POST a new workout
router.post('/', createWorkout);

// Get a single workout
router.get('/:id', getWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;
