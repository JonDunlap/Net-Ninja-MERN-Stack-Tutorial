const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express
const app = express();

// Initialize Routes
const workoutsRouter = require('./routes/workouts');

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutsRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Start the server and listen on port set in .env file
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
