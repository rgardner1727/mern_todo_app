const mongoose = require('mongoose');
const todo = require('../models/todoSchema');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err))

const deleteTodos = async () => {
    await todo.deleteMany({});
    console.log('Successfully deleted todos.');
    mongoose.connection.close();
}

deleteTodos();
