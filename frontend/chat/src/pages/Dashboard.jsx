import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../Components/FetchUserProfile";
import ProfileImageFetcher from "../Components/ProfileImageFetcher";
import { fetchUsers } from "../Helpers/FetchUser";
import { fetchOutgoingRequests } from "../Helpers/FetchOutgoingRequest";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [acceptedRooms, setAcceptedRooms] = useState([]);
  const navigate = useNavigate();

  const handleSendRequest = async (receiverUsername) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}send_requests/`, {
        receiver_username: receiverUsername,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      alert("Request Sent!");
      fetchOutgoingRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Error Sending Request");
    }
  };

  const handleAccept = async (roomId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}accept_request/`, {
        room_id: roomId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      alert("Request Accepted");
      fetchAll();
    } catch (error) {
      alert("Error accepting request");
    }
  };

  const handleDecline = async (roomId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}decline_request/`, {
        room_id: roomId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      alert("Request Declined");
      fetchPendingRequests();
    } catch (error) {
      alert("Error declining request");
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}pending_requests/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setPendingRequests(res.data);
    } catch (error) {
      console.error("Error fetching pending requests", error);
    }
  };

  const fetchAcceptedRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}accepted_rooms/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setAcceptedRooms(res.data);
    } catch (error) {
      console.error("Error fetching accepted rooms", error);
    }
  };

  const fetchAll = () => {
    fetchUsers(setUsers)
    fetchUserProfile(navigate, setUserProfile);
    fetchPendingRequests();
    fetchOutgoingRequests(setOutgoingRequests)
    fetchAcceptedRooms();
  };

  const getRoomId = (username) => {
    const accepted = acceptedRooms.find(
      (r) => r.friend_username === username
    );
    const pending = pendingRequests.find(
      (r) => r.sender === username
    );
    const outgoing = outgoingRequests.find(
      (r) => r.receiver === username
    );
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
                            onClick={() => handleAccept(roomId)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                            onClick={() => handleDecline(roomId)}
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                          onClick={() => handleSendRequest(username)}
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
