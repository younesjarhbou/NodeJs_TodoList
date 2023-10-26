const express = require('express');
const Todo = require('../models/todo');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Define a route for updating the state of a todo
router.put('/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update todo.' });
  }
});

module.exports = router;
