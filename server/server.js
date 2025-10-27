const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('⚡ EchoChat Server with Socket.io is running!');
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('disconnect', (reason) => { // reason is passed here
    console.log(`🔴 User disconnected: ${socket.id}. Reason: ${reason}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
