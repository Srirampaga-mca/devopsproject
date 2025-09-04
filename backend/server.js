// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To use environment variables from .env file
console.log(process.env.MONGO_URI)
// Import the Todo model
const Todo = require('./models/Todo');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests

// Define the port
const PORT = process.env.PORT || 5000;
const mongouri =  "mongodb+srv://srirampagamca:srirampagamca@cluster0.y6by5xf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// --- Database Connection ---
mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('Connection error', err));

// --- API Routes ---

// GET: Fetch all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Get newest first
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// POST: Create a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
         res.status(400).json({ message: 'Bad Request', error: err.message });
    }
});

// PUT: Update a todo (mark as completed/incomplete)
app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


// DELETE: Delete a todo by its ID
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
         if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
