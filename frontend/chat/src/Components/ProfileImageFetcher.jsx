import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function ProfileImageFetcher({ size = 80 }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("access");

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImageUrl(res.data.profile_image);
      setUsername(res.data.username);
      setError(false);
    } catch (err) {
      console.error("Failed to fetch profile image", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("access");
    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}upload_profile_image/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProfile(); // Refresh the profile image
    } catch (err) {
      console.error("Failed to upload image", err);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
      ) : error || !imageUrl ? (
        <div
          className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm cursor-pointer"
          onClick={handleClick}
        >
          ?
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Profile"
          title="Click to change profile image"
          onClick={handleClick}
          className="rounded-full object-cover border-2 border-green-600 bg-center cursor-pointer"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default ProfileImageFetcher;
