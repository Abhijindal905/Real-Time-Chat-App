import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ChatPage() {
  const { roomName } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUserProfile, setOtherUserProfile] = useState(null);
  const bottomRef = useRef();
  const username = localStorage.getItem("username");

  // Connect WebSocket
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

  // Fetch other user's profile
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const access = localStorage.getItem("access");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}get_other_user_profile/${roomName}/`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setOtherUserProfile(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch other user profile", err);
      }
    };

    fetchOtherUser();
  }, [roomName]);

  const handleSend = () => {
    if (message.trim() && socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message, sender: username }));
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[90vh] flex flex-col bg-white border shadow rounded-xl">

      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-3">
        {otherUserProfile ? (
          <>
            <img
              src={otherUserProfile.profile_image}
              alt={otherUserProfile.username}
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{otherUserProfile.username}</span>
              <span className="text-xs text-white/80">Chatting with @{otherUserProfile.username}</span>
            </div>
          </>
        ) : (
          <span>Loading user...</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-3">
        {messages.map((msg, i) => {
          const isUser = msg.sender === username;
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 max-w-[70%] text-sm shadow rounded-2xl ${
                  isUser
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
                <p className="text-xs mt-1 text-right text-white/70">@{msg.sender}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
