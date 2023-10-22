const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

// Define a route for fetching all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todos.' });
  }
});

module.exports = router;
