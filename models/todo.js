const mongoose = require('mongoose');

// Define the schema for the "Todo" model
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the "Todo" model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
