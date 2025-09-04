import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API endpoint for the backend
const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [error, setError] = useState(null);

  // --- Effect to fetch todos from the server on component mount ---
  useEffect(() => {
    fetchTodos();
  }, []);

  // --- API Functions ---

  // Fetch all todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos. Is the server running?");
    }
  };

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return; // Prevent adding empty todos
    try {
      const response = await axios.post(API_URL, { text: newTodoText });
      setTodos([response.data, ...todos]); // Add new todo to the top of the list
      setNewTodoText(''); // Clear input field
      setError(null);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo.");
    }
  };

  // Toggle the completion status of a todo
  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo.");
    }
  };

  // Delete a todo from the server
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo.");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container col-lg-8 mx-auto p-4 p-md-5">
        
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark">MERN Todo List</h1>
          <p className="text-muted mt-2">A simple and fast todo application.</p>
        </header>

        {/* Add Todo Form */}
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <form onSubmit={addTodo}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder="What needs to be done?"
                            className="form-control form-control-lg"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary fw-semibold px-4"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="alert alert-danger" role="alert">
                <strong>Oops!</strong> {error}
            </div>
        )}

        {/* Todos List */}
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="list-group-item p-3 d-flex justify-content-between align-items-center"
              >
                <span
                  onClick={() => toggleComplete(todo._id)}
                  className={`flex-grow-1 ${todo.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}`}
                  style={{ cursor: 'pointer' }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="btn btn-outline-danger btn-sm"
                  aria-label="Delete todo"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;