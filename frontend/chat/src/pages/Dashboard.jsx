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
    <div className="min-h-screen max-w-5xl mx-auto p-4 md:p-8">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <ProfileImageFetcher size={50} />
        <h1 className="text-3xl font-bold text-green-700">
          👋 Welcome, {userProfile?.username || "User"}
        </h1>
      </div>

      {/* User List Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {users
              .filter((user) => user.username !== userProfile?.username)
              .map((user) => {
                const username = user.username;
                const roomId = getRoomId(username);

                return (
                  <li
                    key={user.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-lg bg-green-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profile_image || "/default-profile.png"}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-green-600"
                      />
                      <span className="text-lg font-semibold">{username}</span>
                    </div>

                    <div className="flex gap-2 mt-3 sm:mt-0">
                      {isRequestAccepted(username) ? (
                        <button
                          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
                          onClick={() => navigate(`/chat/${roomId}`)}
                        >
                          Chat
                        </button>
                      ) : isRequestSent(username) ? (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                        >
                          Request Sent
                        </button>
                      ) : isRequestIncoming(username) ? (
                        <>
                          <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                            onClick={() => handleAccept(roomId, fetchAll)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                            onClick={() => handleDecline(roomId, () => fetchPendingRequests(setPendingRequests))}
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                          onClick={() => handleSendRequest(username, () => fetchOutgoingRequests(setOutgoingRequests))}
                        >
                          Send Request
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
