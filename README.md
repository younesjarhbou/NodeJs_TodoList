
# Node.js Todo List Backend  

This is a Node.js backend application built using Express and MongoDB. The purpose of this application is to handle CRUD operations (Create, Read, Update, Delete) for a todo list.

### Key Features:
- Add a new todo item
- Update an existing todo item
- Get all todo items
- Delete a todo item

### System Requirements

To run this application, make sure you have the following:

- Node.js (version v18.17.1 or higher)
- MongoDB (version v7.0.2 or higher)


### Installation and Setup
- Clone this repository:
```Bash
    git clone https://github.com/younesjarhbou/NodeJs_TodoList.git
```
 
 
- Install dependencies:
```Bash
    npm install
``` 

- Set up the environment variables by creating a .env file based on the provided .env.example file.


```Bash
    
ACCESS_TOKEN_SECRET=token
accessToken=tokenForUniTest
mongoURI=MongoDbConnectionLink
```

- Start the server:
```Bash
    node server.js
``` 
- or

```Bash
     npm start
``` 
- The server will run on http://localhost:3000 by default.


### API Endpoints

- POST /todos: Create a new todo item
usage send this in body
```Bash
    {
    "text": "Go to Gym",
    "completed": false
    }

``` 
- PUT /todos/{id}: Update an existing todo item

usage send this in body
```Bash
    {
    "completed": true
    }


``` 

- GET /todos: Retrieve all todo items
- DELETE /todos/{id}: Delete a todo item
- Login  /login : to create login into JWT and get a token

usage send this in body
```Bash
    {
    "username": "anyUsername"
    }
``` 

### Authentication and Security
For security purposes, this application uses JWT (JSON Web Tokens) for authentication. Make sure you set the following environment variables in the .env file:

- JWT_SECRET: Secret key used for signing and verifying JWT tokens
Other required environment variables related to your MongoDB configuration


### Testing
To run the tests, execute the following command:

```Bash
     npx jest
``` 
 






## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

