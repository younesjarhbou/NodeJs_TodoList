const express = require('express');
const { mongoConnectionString } = require('../config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('supertest');
const Todo = require('../models/todo');

const app = express();

app.use(bodyParser.json());
app.use('/todos', require('../routes/todos'));


var globalTodoData = [];

var isPostFinished = false;
var isGetFinished = false;
var isPutFinished = false;

var globalId = "";
describe('Todo API', () => {
 
  beforeAll(async () => {
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //delete all data in the database mongodb
    await Todo.deleteMany({});

    app.server = await app.listen();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.server.close();
  });

  describe('POST /todos', () => {
    it.concurrent('should add a new todo', async () => {
      const todoData = { "text": "New Todo", "completed": false };
      app.use('/todos', require('../routes/addTodo'));

      const response = await request(app)
        .post('/todos')
        .send(todoData);

      globalTodoData.push(response.body);
      globalId = globalTodoData[0]["_id"];

    
      expect(response.status).toBe(201);
      expect(response.body.text).toBe(todoData.text);
      expect(response.body.completed).toBe(todoData.completed);
      isPostFinished = true;
    });
  
    // You can write additional tests for this route
  });

  describe('GET /todos', () => {
    it.concurrent('should return all todos', async () => {
      //wait until post finished
      while(!isPostFinished){
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      app.use('/todos', require('../routes/todos'));
      const response = await request(app).get('/todos');
      console.log("Response GET Body:", response.body);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(globalTodoData);
    });
    isGetFinished = true;
  
    // You can write additional tests for this route, such as testing with pre-populated todos in the database
  });

  describe('PUT /todos/:id', () => {
    it.concurrent('should update the state of a todo', async () => {
      //wait until post finished
      while(!isGetFinished){
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const updatedTodoData = { completed: true };
      app.use('/todos', require('../routes/updateTodo'));
      console.log("globalId:", globalId);
      const response = await request(app)
        .put(`/todos/${globalId}`)
        .send(updatedTodoData);

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(updatedTodoData.completed);
    });
    isPutFinished = true;
    // You can write additional tests for this route, such as testing with invalid todo ID or non-existent todos
  });

  describe('DELETE /todos/:id', () => {
    it.concurrent('should delete a todo', async () => {
      //wait until post finished
      while(!isPutFinished){
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      app.use('/todos', require('../routes/deleteTodo'));
      const response = await request(app).delete(`/todos/${globalId}`);

      expect(response.status).toBe(200);
      expect(response.body.text).toBe(globalTodoData[0].text);
      expect(response.body.completed).toBe(globalTodoData[0].completed);
    });

    // You can write additional tests for this route, such as testing with invalid todo ID or non-existent todos
  });
});
