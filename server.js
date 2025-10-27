const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server for socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

// Serve a basic route
app.get('/', (req, res) => {
  res.send('⚡ EchoChat Server with Socket.io is running!');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Listen for messages
  socket.on('chat message', (msg) => {
    console.log('💬 Message:', msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

app.use(express.static(__dirname));

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
