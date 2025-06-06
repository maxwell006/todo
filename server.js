const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API');
  });  
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(process.env.PORT || 5000, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
  })
  .catch(err => console.info(err));
