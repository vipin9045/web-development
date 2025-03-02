import React from "react";
import axios from "axios";

const TaskList = ({ tasks, setTasks }) => {
    const toggleCompletion = (id) => {
        axios.put(`http://localhost:5000/api/tasks/${id}`)
            .then(res => {
                setTasks(tasks.map(task => task._id === id ? res.data : task));
            })
            .catch(err => console.error("Error updating task", err));
    };

    const deleteTask = (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        axios.delete(`http://localhost:5000/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error("Error deleting task", err));
    };

    return (
        <ul>
            {tasks.map(task => (
                <li key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleCompletion(task._id)}
                    />
                    <span>{task.text}</span>
                    <button onClick={() => deleteTask(task._id)}>X</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
