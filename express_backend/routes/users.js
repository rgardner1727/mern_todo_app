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

router.get('/:username', async (req, res, next) => {
    try{
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
            return res.status(404).send(`User with username '${req.params.username}' does not exist.`);
        res.json(userByUsername);
    }catch(err){
        res.status(500).send(`Error finding user with username '${req.params.username}'.`);
    }
})

router.put('/:username/updatePassword', async (req, res, next) => {
    try{
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
            return res.status(404).send(`Could not update password. User with username '${req.params.username}' does not exist.`);
        await user.updateOne({username: req.params.username}, {$set: {password: req.body.password}});
        res.status(204).send(`Password successfully updated for user with username '${req.params.username}'.`);
    }catch(err){
        console.log(err);
        res.status(500).send(`Error updating password for user with username '${req.params.username}'.`);
    }
})

router.put('/:username/updateUsername', async (req, res, next) => {
    try{
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
            return res.status(404).send(`Could not update username. User with username '${req.params.username}' does not exist.`);
        await user.updateOne({username: req.params.username}, {$set: {username: req.body.username}});
        const userTodos = await todo.find({username: req.params.username});
        if(!userTodos)
            return res.status(204).send(`User with username '${req.params.username}' has successfully been changed to '${req.body.username}'.`);
        await todo.updateMany({username: req.params.username}, {$set: {username: req.body.username}});
        res.status(204).send(`User with username '${req.params.username}' has successfully been changed to '${req.body.username}'. User todos have also been updated.`);
    }catch(err){
        if(!err.code == 11000)
            return res.status(500).send(`Error updating user with username '${req.params.username}' to '${req.body.username}'.`);
        res.status(404).send(`Failed update username. A user with the username '${req.body.username}' already exists`);
    }
})

//http://locahost:3000/users/exampleusername/todos GET
router.get('/:username/todos', async (req, res, next) => {
    try{
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
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
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
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
        const userByUsername = await userExistsUsername(req.params.username);
        if(!userByUsername)
            return res.status(404).send(`Could not find todo with id '${req.params.id}'. User with username '${req.params.username}' does not exist.`);
        const todoById = await todo.findById(req.params.id);
        if(!todoById)
            return res.status(404).send(`Could not find todo. Todo with id '${req.params.id}' for user '${req.params.username}' does not exist.`);
        res.json(todoById);
    }catch(err){
        console.log(err);
        res.status(500).send(`Error finding todo with id '${req.params.id}' for user '${req.params.username}'.`)
    }
})

router.put('/:username/todos/:id', async (req, res, next) => {
    try{
        const userByUsername = await userExistsUsername(req.params.username); 
        if(!userByUsername)
            return res.status(404).send(`Could not update todo with id '${req.params.id}'. User with username '${req.params.username}' does not exist.`);
        const todoById = await todo.findById(req.params.id);
        if(!todoById)
            return res.status(404).send(`Could not update todo. Todo with id '${req.params.id}' for user '${req.params.username}' does not exist.`);
        await todo.updateOne({_id: req.params.id}, {$set: {text: req.body.text, completed: req.body.completed}});
        res.status(204).send(`Successfully updated todo with id '${req.params.id}'.`);
    }catch(err){
        res.status(500).send(`Error updating todo with id '${req.params.id}'.`);
    }
})

const userExistsUsername = async (usernameParam) => {
    const userByUsername = await user.find({username: usernameParam});
    return userByUsername.length !== 0 ? userByUsername : null
}

module.exports = router;
