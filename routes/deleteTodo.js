const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

// Define a route for deleting a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndRemove(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(deletedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete todo.' });
  }
});

module.exports = router;
