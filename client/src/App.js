import React, { useEffect } from "react";
// DO NOT import 'io' and connect outside the component

function App() {
  useEffect(() => {
    // 1. Establish the connection
    const socket = require("socket.io-client").io("http://localhost:5000");

    // 2. Set up event listeners
    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("chat message", (msg) => {
      console.log("💬 Message from server:", msg);
    });

    // 3. Define the cleanup function
    // This will run when the component unmounts or before the effect reruns.
    return () => {
      socket.off("connect"); // Clean up listeners
      socket.off("chat message");
      socket.disconnect(); // Disconnect the socket
      console.log("🛑 Disconnected socket in cleanup.");
    };
    
  // Empty dependency array ensures it only runs on mount and cleanup on unmount
  }, []); 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>EchoChat 💬</h1>
      <p>Check the console — Socket.IO connection should now persist!</p>
    </div>
  );
}

export default App;