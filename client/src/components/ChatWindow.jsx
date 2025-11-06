// src/components/ChatWindow.jsx
import React from "react";

export default function ChatWindow({ messages }) {
  return (
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
  );
}
