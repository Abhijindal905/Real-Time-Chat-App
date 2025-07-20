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
    <div className="pt-16 h-[calc(100vh-64px)] w-full bg-gradient-to-br from-green-100 to-blue-100 flex justify-center items-center px-4">
      <div className="w-full max-w-4xl flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Chat Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md">
          {otherUserProfile ? (
            <>
              <img
                src={otherUserProfile.profile_image || "/default-profile.png"}
                alt="User Avatar"
                className="w-14 h-14 rounded-full border-2 border-white shadow"
              />
              <div>
                <h2 className="text-lg font-semibold">{otherUserProfile.username}</h2>
                <p className="text-sm text-white/80">You're connected</p>
              </div>
            </>
          ) : (
            <p className="text-white text-lg font-medium">Loading...</p>
          )}
        </div>

        {/* Message Area */}
        <div className="flex-1 px-5 py-4 overflow-y-auto bg-gray-50 space-y-4">
          {messages.map((msg, i) => {
            const isSender = msg.sender === username;
            return (
              <div
                key={i}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-sm shadow-md max-w-[70%] break-words whitespace-pre-line ${
                    isSender
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white border border-gray-300 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs text-right mt-1 text-white/70">
                    @{msg.sender}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Message Input */}
        <div className="border-t px-4 py-3 bg-white flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type something..."
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition text-white font-semibold px-5 py-2 rounded-full shadow"
          >
            Send 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
