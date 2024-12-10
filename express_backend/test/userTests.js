const mongoose = require('mongoose');
const user = require('../models/userSchema');
const todo = require('../models/todoSchema');
require('dotenv').config();

console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Error connecting to MongoDB', err));

const deleteUsers = async () => {
    await user.deleteMany({});
    console.log('Succesfully deleted users.');
    mongoose.connection.close();
}

deleteUsers();
