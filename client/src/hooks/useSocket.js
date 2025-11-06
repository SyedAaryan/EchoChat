// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import socket from "../socket";

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("🛑 Disconnected");
    });

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.disconnect();
      console.log("🧹 Socket cleaned up");
    };
  }, []);

  const sendMessage = (msg) => {
    if (msg.trim()) socket.emit("chat message", msg);
  };

  return { isConnected, messages, sendMessage };
}
