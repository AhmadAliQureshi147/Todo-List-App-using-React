import React, { useState, useEffect } from 'react';

const TodoListItem = ({ todo, onToggleCompleted, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(todo.task);

    useEffect(() => {
        if (todo.dueDate && !todo.completed) {
            const dueDate = new Date(todo.dueDate);
            const now = new Date();
            if (dueDate <= now) {
                alert(`Task "${todo.task}" is due!`);
            }
        }
    }, [todo.dueDate, todo.completed, todo.task]);

    const handleToggleCompleted = () => {
        onToggleCompleted(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        todo.task = editedTask;
        setIsEditing(false);
    };

    const handleEditChange = (e) => {
        setEditedTask(e.target.value);
    };

    const getPriorityBadgeClass = () => {
        switch (todo.priority) {
            case 'High':
                return 'badge badge-danger text-dark';
            case 'Normal':
                return 'badge badge-success text-dark'; // Green color
            case 'Low':
                return 'badge badge-purple text-dark'; // Purple color
            default:
                return 'badge badge-secondary text-dark';
        }
    };

    const className = `todo-list-item list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light text-muted' : ''}`;

    return (
        <li className={className}>
            {isEditing ? (
                <div className="flex-grow-1">
                    <input
                        type="text"
                        value={editedTask}
                        onChange={handleEditChange}
                        className="form-control"
                    />
                    <button onClick={handleSaveClick} className="btn btn-success btn-sm mt-2">
                        Save
                    </button>
                </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={handleToggleCompleted}
                            className="mr-2"
                        />
                        <span>{todo.task}</span>
                        <span className={getPriorityBadgeClass()}>{todo.priority}</span>
                        {todo.dueDate && (
                            <span className="ml-2">
                                {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <div>
                        <button onClick={handleEditClick} className="btn btn-secondary btn-sm mr-2">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="btn btn-danger btn-sm">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TodoListItem;
