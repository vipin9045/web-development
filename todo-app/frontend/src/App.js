import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");

    // Fetch tasks from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/tasks")
            .then(res => setTasks(res.data))
            .catch(err => console.error("Error fetching tasks", err));
    }, []);

    // Add new task
    const addTask = () => {
        if (newTask.trim() === "") return alert("Task cannot be empty!");
        if (!dueDate) return alert("Please select a due date!");

        const taskData = { text: newTask, dueDate, priority, completed: false };

        axios.post("http://localhost:5000/api/tasks", taskData)
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error("Error adding task", err));

        setNewTask("");
        setDueDate("");
        setPriority("Medium");
    };

    // Delete task
    const deleteTask = (id) => {
        if (!window.confirm("Are you sure you want to delete this task? ❌")) return;

        axios.delete(`http://localhost:5000/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error("Error deleting task", err));
    };

    // Toggle task completion
    const toggleCompletion = (id) => {
        const updatedTasks = tasks.map(task =>
            task._id === id ? { ...task, completed: !task.completed } : task
        );

        setTasks(updatedTasks);

        const taskToUpdate = updatedTasks.find(task => task._id === id);
        axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: taskToUpdate.completed })
            .then(() => {
                alert(`Task marked as ${taskToUpdate.completed ? "completed ✅" : "incomplete ❌"}`);
            })
            .catch(err => console.error("Error updating task", err));
    };

    // Sort tasks by priority and due date
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Calculate time left for each task
    const getTimeLeft = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const timeDiff = due - now;

        if (timeDiff <= 0) return "⏳ Time's Up!";

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

        return `${days}d ${hours}h ${minutes}m left`;
    };

    return (
        <div className="container">
            <h1>To-Do List ✅</h1>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onClick={addTask} className="btn">Add Task</button>
            </div>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompletion(task._id)}
                        />
                        <div>
                            <strong>{task.text}</strong> <br />
                            <small>
                                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
                            </small>
                            |
                            <span className={`priority ${task.priority ? task.priority.toLowerCase() : "medium"}`}>
                                {task.priority || "Medium"}
                            </span>
                            <br />
                        </div>
                        <button onClick={() => deleteTask(task._id)} className="delete-btn">X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
