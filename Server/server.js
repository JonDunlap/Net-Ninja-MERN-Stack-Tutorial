const Express = require('express');
require('dotenv').config();

// Initialize express
const app = Express();

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

// Start the server and listen on port set in .env file
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
