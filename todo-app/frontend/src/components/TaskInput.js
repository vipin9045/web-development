import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ setTasks }) => {
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim() === "") {
            alert("⚠ Task cannot be empty!");
            return;
        }

        axios.post("http://localhost:5000/api/tasks", { text: newTask })
            .then(res => {
                setTasks(prevTasks => [...prevTasks, res.data]);
                alert("✅ Task added successfully!");
                setNewTask(""); // Clear input
            })
            .catch(err => console.error("Error adding task", err));
    };

    return (
        <div>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask} className="add-task-btn">Add Task</button>
        </div>
    );
};

export default TaskInput;
