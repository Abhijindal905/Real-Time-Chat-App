import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileImageFetcher from '../Components/ProfileImageFetcher';

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}list_room/`);
      setRooms(res.data.rooms);
      console.log(res.data.rooms);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  const fetchUserProfile = async () => {
    let token = localStorage.getItem("access");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refresh = localStorage.getItem("refresh");
          const newRes = await axios.post(`${import.meta.env.VITE_API_URL}token/refresh/`, {
            refresh: refresh
          });
          token = newRes.data.access;
          localStorage.setItem("access", token);
  
          // retry fetching profile
          const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(res.data);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.clear();
          navigate("/login");
        }
      } else {
        console.error("Error fetching user profile:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchRooms();
    fetchUserProfile();
  }, []);

  const handleJoinRoom = (roomName) => {
    navigate(`/chat/${roomName}`);
  };

  const handleCreateRoom = async () => {
    if (!newRoom.trim()) return;

    let accessToken = localStorage.getItem("access");

    const tryCreateRoom = async (token) => {
      return await axios.post(
        `${import.meta.env.VITE_API_URL}create_room/`,
        { room_name: newRoom },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    };

    try {
      await tryCreateRoom(accessToken);
      setNewRoom('');
      fetchRooms();
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refresh = localStorage.getItem("refresh");
          const newRes = await axios.post(`${import.meta.env.VITE_API_URL}token/refresh/`, {
            refresh: refresh
          });
          accessToken = newRes.data.access;
          localStorage.setItem("access", accessToken);

          await tryCreateRoom(accessToken);
          setNewRoom('');
          fetchRooms();
        } catch (refreshError) {
          console.log("Refresh token expired. Redirecting to login.");
          localStorage.clear();
          navigate("/login");
        }
      } else {
        alert("Room name may already exist or something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-4 md:p-8">
      {/* Welcome Section with Profile Image */}
      <div className="flex items-center gap-4 mb-6">
        <ProfileImageFetcher size={80} />
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          👋 Welcome, {userProfile?.username || "User"}
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Rooms</h2>

        {rooms.length === 0 ? (
          <p className="text-gray-500">No rooms available yet. Create one below!</p>
        ) : (
          <ul className="space-y-3">
            {rooms.map((room) => (
              <li
                key={room.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition"
              >
                <span className="text-lg font-medium uppercase">{room.name}</span>
                <button
                  onClick={() => handleJoinRoom(room.name.trim())}
                  className="mt-2 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
                >
                  Join Room
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Create a New Room</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Enter room name"
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleCreateRoom}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-full sm:w-auto"
            >
              ➕ Create New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
