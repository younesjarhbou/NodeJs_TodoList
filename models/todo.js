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
    type: String, // Change the type to String
    default: new Date().toISOString(), // Set a default value as a string representation of the current date and time
  },
});

// Create the "Todo" model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
