const express = require('express');
const auth = require('../middleware/authMiddleware');
const Todo = require('../models/Todo');
const router = express.Router();

// All routes below require authentication
router.use(auth);

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// Create
router.post('/', async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: 'Task is required' });

  const todo = await Todo.create({ task, user: req.user._id });
  res.status(201).json(todo);
});

// Update
router.put('/:id', async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// Delete
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
