var express = require('express');
var router = express.Router();
const user = require('../models/userSchema');
const todo = require('../models/todoSchema')

//http://localhost:3000/users GET
router.get('/', async (req, res, next) => {
    try{
        const users = await user.find();
        if(users.length == 0)
            return res.status(404).send('No users currently exist.');
        res.json(users)
    }catch(err){
        res.status(500).send('Error finding users');
    }
});

//http://localhost:3000/users POST
router.post('/', async (req, res, next) => {
  const newUser = new user(req.body);
  try{
    await newUser.save();
    res.status(201).send('Successfully created new user!');
  }catch(err){
    if(!err.code === 11000)
        return res.status(500).send('Error creating new user.');
    res.status(404).send(`Failed to create new user. A user with the username '${req.body.username}' and/or email '${req.body.email}' already exists`);
  }
});

//http://localhost:3000/users/exampleid GET
router.get('/:id', async (req, res, next) => {
    try{
        const userById = await user.findById(req.params.id);
        if(!userById)
            return res.status(404).send(`Could not find user. User with id '${req.params.id}' does not exist.`);
        res.json(userById);
    }catch(err){
        res.status(500).send(`Error finding user with id '${req.params.id}'`);
    }
});

//http://locahost:3000/users/exampleusername/todos GET
router.get('/:username/todos', async (req, res, next) => {
    try{
        if(!boolUserExists(req.params.username))
            return res.status(404).send(`Could not find todos. User with username '${req.params.username}' does not exist.`);
        const userTodos = await todo.find({username: req.params.username});
        if(userTodos.length == 0)
            return res.status(404).send(`Could not find todos. User with username '${req.params.username}' does not have any todos.`);
        res.json(userTodos);
    }
    catch(err){
        console.log(err);
        res.status(500).send(`Error finding todos for user with username '${req.params.username}'.`);
    }
})

//http://locahost:3000/users/exampleusername/todos POST
router.post('/:username/todos', async (req, res, next) => {
    try{
        if(!boolUserExists(req.params.username))
            return res.status(404).send(`Could not create a new todo. User with username '${req.params.username}' does not exist.`);
        const newTodo = new todo(req.body);
        newTodo.username = req.params.username;
        await newTodo.save();
        res.status(201).send(`Todo created successfully for user with username '${req.params.username}'.`);
    }catch(err){
        console.log(err);
        res.status(500).send(`Error creating new todo for user with username '${req.params.username}'.`);
    }
});

//http://localhost:3000/users/exampleusername/todos/exampleid GET
router.get('/:username/todos/:id', async (req, res, next) => {
    try{
        if(!boolUserExists(req.params.username))
            return res.status(404).send(`Could not find todo with id '${req.params.id}'. User with username '${req.params.username}' does not exist.`);
        const todoById = await todo.findById(req.params.id);
        if(!todoById)
            return res.status(404).send(`Todo with id '${req.params.id}' for user '${req.params.username}' does not exist.`);
        res.json(todoById);
    }catch(err){
        console.log(err);
        res.status(500).send(`Error finding todo with id '${req.params.id}' for user '${req.params.username}'.`)
    }
})

const boolUserExists = async (usernameParam) => {
    return (await user.find({username: usernameParam})) !== 0;
}

module.exports = router;
