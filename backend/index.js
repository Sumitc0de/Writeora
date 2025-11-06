require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser")

// import modules
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route'); // ✅ your user routes
const postRoutes = require("./routes/posts.route")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// DB Connection
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send("Welcome to server");
});

// API Routes
app.use('/api/user', userRoutes); // ✅ attach routes
app.use('/api/posts', postRoutes)
// Start Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
