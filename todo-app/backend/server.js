const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB().then(() => console.log("✅ MongoDB Connected")).catch(err => {
    console.error("❌ MongoDB Connection Error", err);
    process.exit(1);
});

// API Routes
app.use("/api/tasks", require("./routes/tasks"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
