const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const mongoose = require('mongoose');

// Initialize express
const app = express();

// Initialize Routes
const workoutsRouter = require('./routes/workouts');
const userRouter = require('./routes/user');

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutsRouter);
app.use('/api/user', userRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Start the server and listen on port set in .env file
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB and server started on http://localhost:${process.env.PORT}`
      );
    });

    // Serve frontend
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../Frontend/build')));

      app.get('*', (req, res) =>
        res.sendFile(
          path.resolve(__dirname, '../', 'Frontend', 'build', 'index.html')
        )
      );
    } else {
      app.get('/', (req, res) => res.send('Please set to production'));
    }
  })
  .catch((error) => {
    console.log(error);
  });
