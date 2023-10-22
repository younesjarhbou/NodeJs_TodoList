const express = require('express');
const router = express.Router();
const Todo = require('./models/todo'); // Create a "Todo" Mongoose model

router.post('/todos', async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = new Todo({
      text,
      completed,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add a new todo.' });
  }
});

module.exports = router;