const express = require('express');
const mongoose = require('mongoose');
const todoController = require('../controllers/todolist_controller');
const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
router.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API');
});

//all todos route
router.get('/alltodos', todoController.getAllTodos);

//completed todos route
router.patch('/todo-completed/:id',todoController.completedTodo);

//add todos route
router.post('/todos-add', todoController.addTodos);

//delete todos route
router.delete('/todos-delete/:id', todoController.deleteTodos);

//update todos route
router.put('/todos-update/:id', todoController.updateTodos);

module.exports = router;