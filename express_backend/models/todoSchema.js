const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./userSchema')

const todoSchema = new mongoose.Schema({
    text: {type: String, required:true},
    completed: {type: Boolean, default: false},
    username: {type: String, required: true}
})

module.exports = mongoose.model('Todo', todoSchema);