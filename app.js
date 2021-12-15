//node module imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//route imports
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const accountRoutes = require('./routes/account.routes');

//init app
const app = express();

//middlewares
app.use(express.json()); //post request data
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);

//database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('database connection is successful');
  })
  .catch((err) => console.log('Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
