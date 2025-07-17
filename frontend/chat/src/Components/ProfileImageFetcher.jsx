import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileImageFetcher({ size = 80 }) {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    let token = localStorage.getItem("access");

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImageUrl(res.data.profile_image);
      setError(false);
    } catch (err) {
      if (err.res?.status == 401) {
        try{
          const refresh = localStorage.getItem("refresh")
          const newRes = await axios.post(`${import.meta.env.VITE_API_URL}token/refresh/`, {
            refresh: refresh
          });

          token = newRes.data.access
          localStorage.setItem("access", token)
          const res = await axios.get(`${import.meta.env.VITE_API_URL}user_profile/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setImageUrl(res.data.profile_image);
        }
        catch(refreshError){
          console.error("Refresh token failed:", refreshError);
          localStorage.clear();
          navigate("/login");
        }
      }
      console.error("Failed to fetch profile image", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    console.log("click")
  }
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
        className="hidden"
      />
    </div>
  );
}

export default ProfileImageFetcher;
