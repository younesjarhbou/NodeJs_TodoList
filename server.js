
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mongoConnectionString } = require('./config');

const app = express();
const port = process.env.PORT || 3000;
//const verifyToken = require('./middleware/verifyToken');

 
// Connect to your MongoDB database
//BBNW1jWUCrncXDcz
//mongodb+srv://younesdev97:BBNW1jWUCrncXDcz@cluster0.50qm34f.mongodb.net/
// local mongodb://localhost:27017/
mongoose.connect(mongoConnectionString, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use(bodyParser.json());

// Require and use the route files as middleware
app.use('/todos', require('./routes/todos'));
app.use('/todos', require('./routes/updateTodo'));
app.use('/todos', require('./routes/addTodo'));
app.use('/todos', require('./routes/deleteTodo'));
app.use('/todos', require('./routes/signIn'));



app.listen(port, () => console.log(`Server is running on port ${port}`));
