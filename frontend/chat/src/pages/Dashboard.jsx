import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileImageFetcher from "../Components/ProfileImageFetcher";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}list_users/`);
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchUserProfile = async () => {
    let token = localStorage.getItem("access");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}user_profile/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refresh = localStorage.getItem("refresh");
          const newRes = await axios.post(
            `${import.meta.env.VITE_API_URL}token/refresh/`,
            {
              refresh: refresh,
            }
          );
          token = newRes.data.access;
          localStorage.setItem("access", token);

          // retry fetching profile
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}user_profile/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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
    fetchUsers();
    fetchUserProfile();
  }, []);

  const handleJoinRoom = (roomName) => {
    navigate(`/chat/${roomName}`);
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Available Users
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-500">
            No rooms available yet. Create one below!
          </p>
        ) : (
          <ul className="space-y-3">
            {users
              .filter((user) => user.username !== userProfile?.username)
              .map((user) => (
                <li
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition"
                >
                  <span className="text-lg font-medium uppercase flex items-center gap-4">
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-green-600 bg-center"
                    />
                    {user.username}
                  </span>
                  <button
                    onClick={() => handleJoinRoom(user.username.trim())}
                    className="mt-2 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
                  >
                    Join Room
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
