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

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}${roomName.trim()}/`);

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, { message: data.message, sender: data.sender }]);
    };
    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    setSocket(ws);
    return () => ws.close();
  }, [roomName]);

  // Fetch profile
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const access = localStorage.getItem("access");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}get_other_user_profile/${roomName}/`,
          {
            headers: { Authorization: `Bearer ${access}` },
          }
        );
        setOtherUserProfile(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch profile", err);
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
    <div className="w-full h-screen bg-gradient-to-br from-green-100 to-blue-100 flex justify-center items-center px-2">
      <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow">
          {otherUserProfile ? (
            <>
              <img
                src={otherUserProfile.profile_image}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-lg">{otherUserProfile.username}</h2>
                <span className="text-sm opacity-80">You are chatting with them</span>
              </div>
            </>
          ) : (
            <span className="text-white text-lg font-medium">Loading user...</span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-3">
          {messages.map((msg, index) => {
            const isSender = msg.sender === username;
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm transition-all duration-300 ${
                    isSender
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  <p className="break-words whitespace-pre-line">{msg.message}</p>
                  <p className="text-[11px] text-right mt-1 opacity-60">@{msg.sender}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
