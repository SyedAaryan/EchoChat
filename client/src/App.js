// src/App.js
import React from "react";
import useSocket from "./hooks/useSocket";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const { messages, sendMessage } = useSocket();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>💬 EchoChat</h1>
      <ChatWindow messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default App;
