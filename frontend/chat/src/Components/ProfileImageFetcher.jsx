// src/components/ProfileImageFetcher.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfileImageFetcher({ size = 80 }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
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
      } catch (err) {
        console.error("Failed to fetch profile image", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (error || !imageUrl) {
    return (
      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">
        ?
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Profile"
      title={username}
      className="rounded-full object-cover border-2 border-green-600 bg-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

export default ProfileImageFetcher;
