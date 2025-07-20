import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../Components/FetchUserProfile";
import ProfileImageFetcher from "../Components/ProfileImageFetcher";

import {
  fetchUsers,
  fetchOutgoingRequests,
  fetchPendingRequests,
  fetchAcceptedRooms,
} from "../Helpers/UserHelpers";

import {
  handleSendRequest,
  handleAccept,
  handleDecline,
} from "../Helpers/RequestActions";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [acceptedRooms, setAcceptedRooms] = useState([]);
  const navigate = useNavigate();

  const fetchAll = () => {
    fetchUsers(setUsers);
    fetchUserProfile(navigate, setUserProfile);
    fetchPendingRequests(setPendingRequests);
    fetchOutgoingRequests(setOutgoingRequests);
    fetchAcceptedRooms(setAcceptedRooms);
  };

  const getRoomId = (username) => {
    const accepted = acceptedRooms.find((r) => r.friend_username === username);
    const pending = pendingRequests.find((r) => r.sender === username);
    const outgoing = outgoingRequests.find((r) => r.receiver === username);
    return accepted?.id || pending?.id || outgoing?.id;
  };

  const isRequestSent = (username) =>
    outgoingRequests.some((r) => r.receiver === username);

  const isRequestIncoming = (username) =>
    pendingRequests.some((r) => r.sender === username);

  const isRequestAccepted = (username) =>
    acceptedRooms.some((r) => r.friend_username === username);

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 bg-gradient-to-br from-green-100 via-white to-green-100">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <ProfileImageFetcher size={50} />
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-green-700">{userProfile?.username || "User"}</span>
          </h1>
        </div>
      </header>

      {/* Users Section */}
      <section className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Available Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users
              .filter((user) => user.username !== userProfile?.username)
              .map((user) => {
                const username = user.username;
                const roomId = getRoomId(username);

                return (
                  <div
                    key={user.id}
                    className="bg-green-50 hover:shadow-xl transition rounded-xl p-5 flex flex-col items-center text-center"
                  >
                    <img
                      src={user.profile_image || "/default-profile.png"}
                      alt={username}
                      className="w-20 h-20 rounded-full border-2 border-green-500 object-cover mb-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{username}</h3>

                    <div className="mt-4 w-full flex flex-col gap-2">
                      {isRequestAccepted(username) ? (
                        <button
                          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                          onClick={() => navigate(`/chat/${roomId}`)}
                        >
                          💬 Chat
                        </button>
                      ) : isRequestSent(username) ? (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                        >
                          ✅ Request Sent
                        </button>
                      ) : isRequestIncoming(username) ? (
                        <>
                          <button
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                            onClick={() => handleAccept(roomId, fetchAll)}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                            onClick={() => handleDecline(roomId, fetchAll)}
                          >
                            ❌ Decline
                          </button>
                        </>
                      ) : (
                        <button
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                          onClick={() => handleSendRequest(username, fetchAll)}
                        >
                          ➕ Send Request
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
