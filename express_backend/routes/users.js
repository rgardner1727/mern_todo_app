var express = require('express');
var router = express.Router();
const user = require('../models/userSchema');
const todo = require('../models/todoSchema')
const authenticateToken = require('../middleware/authenticateToken');

//http://localhost:3000/users GET
router.get('/', authenticateToken, async (req, res, next) => {
    try{
        const users = await user.find();
        if(users.length == 0)
            return res.status(204).send('No users currently exist.');
        res.json(users)
    }catch(err){
        res.status(500).send('Error finding users');
    }
});

router.get('/:username', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
        if(!userByUsername)
            return res.status(404).send(`User with username '${req.params.username}' does not exist.`);
        res.json(userByUsername);
    }catch(err){
        res.status(500).send(`Error finding user with username '${req.params.username}'.`);
    }
});

router.put('/:username/updatePassword', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
        if(!userByUsername)
            return res.status(404).send(`Could not update password. User with username '${req.params.username}' does not exist.`);
        await user.updateOne({username: req.params.username}, {$set: {password: req.body.password}});
        res.status(204).send(`Password successfully updated for user with username '${req.params.username}'.`);
    }catch(err){
        console.log(err);
        res.status(500).send(`Error updating password for user with username '${req.params.username}'.`);
    }
});

router.put('/:username/updateUsername', authenticateToken, async (req, res, next) => {
    try{
        const userByUsername = await user.findOne({username: req.params.username});
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
});

module.exports = router;
