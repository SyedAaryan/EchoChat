// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());


//Routes
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("⚡ EchoChat Server with Socket.io + MongoDB is running!");
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log(`💬 ${socket.id}: ${msg}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 ${socket.id} disconnected. Reason: ${reason}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
