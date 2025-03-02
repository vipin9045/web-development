const express = require("express");
const router = express.Router();

let tasks = []; // Stores tasks in memory

/**
 * @route GET /api/tasks
 * @desc Get all tasks
 */
router.get("/", (req, res) => {
    res.json(tasks);
});

/**
 * @route POST /api/tasks
 * @desc Add a new task
 * @body { name: "Task Name" }
 */
router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Task name is required" });
    }

    const newTask = { id: tasks.length + 1, name, completed: false };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete a task by ID
 */
router.delete("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});

module.exports = router;
