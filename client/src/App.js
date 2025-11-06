import { useState } from "react";
import useSocket from "./hooks/useSocket";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import UsernameForm from "./components/UsernameForm";

function App() {
  const { messages, sendMessage } = useSocket();
  const [username, setUsername] = useState("");

  const handleSetUsername = (name) => {
    setUsername(name);
  };

  const handleSend = (msg) => {
    sendMessage({ user: username, text: msg });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>💬 EchoChat</h1>

      {!username ? (
        <UsernameForm onSetUsername={handleSetUsername} />
      ) : (
        <>
          <p>
            Welcome, <strong>{username}</strong> 👋
          </p>
          <ChatWindow messages={messages} />
          <MessageInput onSend={handleSend} />
        </>
      )}
    </div>
  );
}

export default App;
