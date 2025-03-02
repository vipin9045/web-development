const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for cross-origin requests

// Routes
app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
