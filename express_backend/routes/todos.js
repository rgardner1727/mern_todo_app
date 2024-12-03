const express = require('express');
const router = express.Router();
const user = require('../models/userSchema');
const todo = require('../models/todoSchema');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:username', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
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
});

router.post('/:username', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
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

router.get('/:username/:id', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
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
});

router.put('/:username/:id', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
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
});

module.exports = router;