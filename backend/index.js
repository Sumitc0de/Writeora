require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require("path")
const cookieParser = require("cookie-parser")

// import modules
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route'); // ✅ your user routes
const postRoutes = require("./routes/posts.route")
const uploadRoutes = require('./routes/upload.route')
const aiRoutes = require('./routes/ai.route')
// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))
app.use(
  cors({
    origin: "http://localhost:5173",   // your React frontend
    credentials: true,                 // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// DB Connection
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send("Welcome to server");
});

// API Routes
app.use('/api/user', userRoutes); // ✅ attach routes
app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/ai', aiRoutes)
// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});