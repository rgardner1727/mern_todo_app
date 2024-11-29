const mongoose = require('mongoose');
const config = require('../config/mongo_config');
const user = require('../models/userSchema');
const todo = require('../models/todoSchema');

mongoose.connect(config.db)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Error connecting to MongoDB', err));

const deleteUsers = async () => {
    await user.deleteMany({});
    console.log('Succesfully deleted users.');
    mongoose.connection.close();
}

const deleteTodos = async () => {
    await todo.deleteMany({});
    console.log('Successfully deleted todos.');
    mongoose.connection.close();
}

const checkTodoStructure = async () => {
    try{
        const todos = await todo.find();
        if(todos)
            console.log(todos);
        else
            console.log('Failed to find todos'); 
    }catch(err){
        console.log(err);
    }
}

deleteUsers();
