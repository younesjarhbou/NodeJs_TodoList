const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('../models/todo');
const request = require('supertest');

const app = express();
const { mongoConnectionString } = require('../config');

describe('Todo API', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.use(bodyParser.json());
    app.use('/todos', require('../routes/todos'));

    app.server = await app.listen();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.server.close();
  });

 /* describe('GET /todos', () => {
    it('should return all todos', async () => {
      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
            "_id": "653476dddbe0f95b1d7c5336",
            "text": "Test Todo",
            "completed": false,
            "created_at": "2023-10-22T01:11:57.703Z",
            "__v": 0
        },
        {
            "_id": "653476dddbe0f95b1d7c5338",
            "text": "Test Todo",
            "completed": false,
            "created_at": "2023-10-22T01:11:57.782Z",
            "__v": 0
        },
        {
            "_id": "653477e6a002e1f60e6217ba",
            "text": "Test Todo",
            "completed": false,
            "created_at": "2023-10-22T01:16:22.664Z",
            "__v": 0
        },
        {
            "_id": "653477e6a002e1f60e6217bc",
            "text": "Test Todo",
            "completed": false,
            "created_at": "2023-10-22T01:16:22.745Z",
            "__v": 0
        }
    ]);
    });
  
    // You can write additional tests for this route, such as testing with pre-populated todos in the database
  });*/

  describe('POST /todos', () => {
    it('should add a new todo', async () => {
      const todoData = { "text": "New Todo", "completed": false };
  
      app.use('/todos', require('../routes/addTodo'));
      const response = await request(app)
        .post('/todos')
        .send(todoData);
  
      expect(response.status).toBe(201);
      expect(response.body.text).toBe(todoData.text);
      expect(response.body.completed).toBe(todoData.completed);
    });
  
    // You can write additional tests for this route
  });

  describe('PUT /todos/:id', () => {
    it('should update the state of a todo', async () => {
      const todo = new Todo({ text: 'Test Todo', completed: false });
      await todo.save();

      const updatedTodoData = { completed: true };

      app.use('/todos', require('../routes/updateTodo'));

      const response = await request(app)
        .put(`/todos/${todo._id}`)
        .send(updatedTodoData);

      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(updatedTodoData.completed);
    });

    // You can write additional tests for this route, such as testing with invalid todo ID or non-existent todos
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      const todo = new Todo({ text: 'Test Todo', completed: false });
      await todo.save();

      app.use('/todos', require('../routes/deleteTodo'));
      const response = await request(app).delete(`/todos/${todo._id}`);

      expect(response.status).toBe(200);
      expect(response.body.text).toBe(todo.text);
      expect(response.body.completed).toBe(todo.completed);
    });

    // You can write additional tests for this route, such as testing with invalid todo ID or non-existent todos
  });
});
