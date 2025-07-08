import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function ChatPage() {
  const { roomName } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}${roomName.trim()}/`);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [
        ...prev,
        { message: data.message, sender: data.sender },
      ]);
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    setSocket(ws);

    return () => ws.close();
  }, [roomName]);

  const handleSend = () => {
    if (message.trim() && socket) {
      socket.send(
        JSON.stringify({
          message: message,
          sender: username,
        })
      );
      setMessage("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col border rounded shadow bg-white m-4">
      
      {/* Header */}
      <div className="bg-green-600 text-white text-lg sm:text-xl font-bold p-3 sm:p-4 rounded-t flex justify-between items-center">
        <span className="truncate">Chat Room: {roomName}</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => {
          const isUser = msg.sender === username;
          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-xs px-4 py-2 rounded-lg shadow ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <p className="break-words text-sm sm:text-base">{msg.message}</p>
                <p className="text-xs mt-1 font-medium text-right opacity-80">
                  @{msg.sender}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Section */}
      <div className="p-3 sm:p-4 border-t flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-300"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
