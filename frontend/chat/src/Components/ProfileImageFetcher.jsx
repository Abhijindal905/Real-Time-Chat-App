import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileImageFetcher({ size = 80 }) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const fetchProfile = async () => {
    setLoading(true);
    let token = localStorage.getItem("access");

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setImageUrl(res.data.profile_image);
      setError(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const refresh = localStorage.getItem("refresh");
          const newRes = await axios.post(`${import.meta.env.VITE_API_URL}token/refresh/`, {
            refresh: refresh,
          });

          token = newRes.data.access;
          localStorage.setItem("access", token);

          const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setImageUrl(res.data.profile_image);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.clear();
          navigate("/login");
        }
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const token = localStorage.getItem("access");
      await axios.put(`${import.meta.env.VITE_API_URL}upload_profile_image/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProfile();
    } catch (err) {
      console.error("Failed to upload image", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="relative group" onClick={handleClick}>
      {loading ? (
        <div
          className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ) : error || !imageUrl ? (
        <div
          className="w-20 h-20 rounded-full bg-gray-400 text-white flex items-center justify-center cursor-pointer"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          ?
        </div>
      ) : (
        <>
          <img
            src={imageUrl}
            alt="Profile"
            className="rounded-full object-cover border-2 border-green-600 cursor-pointer"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
            Click to change
          </div>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ProfileImageFetcher;
