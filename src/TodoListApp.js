import React, { useState, useEffect } from 'react';
import TodoListItem from './TodoListItem';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './custom.css'; // Import custom CSS for additional styling

const TodoListApp = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState('Normal');
    const [newDueDate, setNewDueDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (task, priority, dueDate) => {
        if (task.trim() !== '') {
            setTodos([...todos, { id: Date.now(), task, completed: false, priority, dueDate }]);
            setNewTask('');
            setNewPriority('Normal');
            setNewDueDate('');
        }
    };

    const toggleCompleted = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setNewPriority(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setNewDueDate(e.target.value);
    };

    const handleAddClick = () => {
        addTodo(newTask, newPriority, newDueDate);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'} p-4`}>
            <h1 className="my-4">To-Do List</h1>
            <button onClick={toggleTheme} className="btn btn-secondary mb-3">
                {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </button>
            <input
                type="text"
                placeholder="Search tasks"
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="list-group mb-3">
                {filteredTodos.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onToggleCompleted={toggleCompleted}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
            <div className="input-group mb-3">
                <input
                    type="text"
                    placeholder="Add a new task"
                    className="form-control"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <select className="form-control" value={newPriority} onChange={handlePriorityChange}>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    className="form-control"
                    value={newDueDate}
                    onChange={handleDueDateChange}
                />
                <button onClick={handleAddClick} className="btn btn-primary">
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TodoListApp;
