const mongoose = require('mongoose');
const config = require('../config/mongo_config');
const todo = require('../models/todoSchema');

mongoose.connect(config.db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err))



//checkTodoStructure();
deleteTodos();
