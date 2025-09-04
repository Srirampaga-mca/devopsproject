const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a todo item
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
// Mongoose will create a collection named 'todos' in the database
module.exports = mongoose.model('Todo', TodoSchema);