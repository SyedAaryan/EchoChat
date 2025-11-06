// src/components/MessageInput.jsx
import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}
