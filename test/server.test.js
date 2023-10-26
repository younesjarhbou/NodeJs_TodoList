const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('../models/todo');
const request = require('supertest');


const app = express();
const { mongoConnectionString } = require('../config');
var globalTodoData = [];

describe('Todo API', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //delete all data inside mongodb
    await Todo.deleteMany({});

    app.use(bodyParser.json());
    app.use('/todos', require('../routes/todos'));

    app.server = await app.listen();
  });

  afterAll(async () => {
        //delete all data inside mongodb
        await Todo.deleteMany({});
    await mongoose.connection.close();

    await app.server.close();
  });

  

describe('Todo API', () => {
  // ...

  describe('POST /todos', () => {
    it('should add a new todo', async () => {
      const todoData = { text: "New Todo", completed: false };

            app.use('/todos', require('../routes/addTodo'));

      const response = await request(app)
        .post('/todos')
        .set('Authorization', 'Bearer ' + process.env.accessToken)
        .send(todoData);

      expect(response.status).toBe(201);
      expect(response.body.text).toBe(todoData.text);
      expect(response.body.completed).toBe(todoData.completed);
    });

    // Additional tests can be added here
  });

  describe('GET /todos', () => {
    let todo;

 

    it('should return all todos', async () => {
      app.use('/todos', require('../routes/todos'));
      const response = await request(app)
        .get('/todos')
        .set('Authorization', 'Bearer ' + process.env.accessToken);

      const itemsArray = Object.values(response.body);

      expect(response.status).toBe(200);
     // expect(firstItem).toEqual(todoObject);
    });

    // Additional tests can be added here
  });

  describe('PUT /todos/:id', () => {
    it('should update the state of a todo', async () => {
      const todo = new Todo({ text: 'Test Todo', completed: false });
      await todo.save();
      const updatedTodoData = { completed: true };

      app.use('/todos', require('../routes/updateTodo'));

      const response = await request(app)
        .put(`/todos/${todo._id}`)
        .set('Authorization', 'Bearer ' + process.env.accessToken)
        .send(updatedTodoData);

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(updatedTodoData.completed);
    });

    // Additional tests can be added here
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      const todo = new Todo({ text: 'Test Todo', completed: false });
      await todo.save();

      app.use('/todos', require('../routes/deleteTodo'));
      const response = await request(app)
        .delete(`/todos/${todo._id}`)
        .set('Authorization', 'Bearer ' + process.env.accessToken);

      expect(response.status).toBe(200);
      expect(response.body.text).toBe(todo.text);
      expect(response.body.completed).toBe(todo.completed);
    });

    // Additional tests can be added here
  });

  // ...

});

});