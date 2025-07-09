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
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}${roomName.trim()}/`);

    ws.onopen = () => console.log("✅ Connected to WebSocket");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, { message: data.message, sender: data.sender }]);
    };
    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    setSocket(ws);
    return () => ws.close();
  }, [roomName]);

  const handleSend = () => {
    if (message.trim() && socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message, sender: username }));
      setMessage("");
    }
  };

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className="w-full max-w-3xl mx-auto h-[90vh] flex flex-col rounded-xl shadow-md border bg-white overflow-hidden">

      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 text-lg font-semibold flex justify-between items-center">
        <span className="truncate">💬 Room: {roomName}</span>
        <span className="text-sm text-white/80">You: @{username}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4">
        {messages.map((msg, i) => {
          const isUser = msg.sender === username;
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 max-w-[75%] rounded-2xl shadow text-sm ${
                  isUser
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
                <p className="text-xs mt-1 text-right text-black/50">@{msg.sender}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type something..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-full text-sm font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
