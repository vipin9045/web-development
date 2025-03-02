const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        
        // Ensure all tasks have required fields
        const sanitizedTasks = tasks.map(task => ({
            _id: task._id,
            text: task.text || "Untitled Task",
            dueDate: task.dueDate || new Date().toISOString(),
            priority: task.priority || "Medium",
            completed: task.completed || false
        }));

        res.json(sanitizedTasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add new task
router.post("/", async (req, res) => {
    try {
        const { text, dueDate, priority } = req.body;
        if (!text || !dueDate) return res.status(400).json({ message: "Task text and due date are required" });

        const newTask = new Task({ 
            text, 
            dueDate, 
            priority: priority || "Medium", 
            completed: false 
        });

        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ message: "Error adding task" });
    }
});

// Update task completion status
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error updating task" });
    }
});

// Delete task
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task" });
    }
});

module.exports = router;
