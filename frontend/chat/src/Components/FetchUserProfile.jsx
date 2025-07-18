// src/utils/fetchUserProfile.js
import axios from "axios";

export const fetchUserProfile = async (navigate, setUserProfile) => {
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
          { refresh }
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
