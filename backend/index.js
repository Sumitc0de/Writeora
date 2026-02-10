require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
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
const allowedOrigins = [
  "http://localhost:5173",
  "https://writeora-ai.vercel.app",
  "https://writeora.netlify.app",
  "https://writeora-2w2z.onrender.com",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
  }

  // 🔥 VERY IMPORTANT
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


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