import React, { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null); // store socket instance
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Dynamically import socket.io-client to avoid SSR issues
    const { io } = require("socket.io-client");
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // ✅ Connected
    newSocket.on("connect", () => {
      console.log("✅ Connected to server:", newSocket.id);
    });

    // 💬 When server sends a chat message
    newSocket.on("chat message", (msg) => {
      console.log("💬 Message from server:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // 🔴 On disconnect
    newSocket.on("disconnect", (reason) => {
      console.log("🛑 Disconnected:", reason);
    });

    // Cleanup on unmount
    return () => {
      newSocket.off("connect");
      newSocket.off("chat message");
      newSocket.disconnect();
      console.log("🧹 Cleanup: Disconnected socket.");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socket || message.trim() === "") return;
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>💬 EchoChat</h1>

      {/* Chat Window */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "400px",
          margin: "20px auto",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#888" }}>No messages yet...</p>
        ) : (
          messages.map((msg, i) => (
            <p key={i} style={{ textAlign: "left", margin: "6px 0" }}>
              {msg}
            </p>
          ))
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "300px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            marginLeft: "10px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
