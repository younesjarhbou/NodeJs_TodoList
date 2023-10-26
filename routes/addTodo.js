const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');


const router = express.Router();
const verifyToken = require('../middleware/verifyToken');



// Define a route for adding a new todo
router.post('/', verifyToken, async (req, res) => {
  // The user is authenticated and you can proceed with the code inside this route

  try {

    const { text, completed } = req.body;
    const todo = new Todo({ text, completed });
    await todo.save();

    res.status(201).json({
      _id: todo._id,
      text: todo.text,
      completed: todo.completed,
      created_at: todo.created_at
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add a new todo.' });
  }
});

module.exports = router;
