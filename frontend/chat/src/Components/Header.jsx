import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const access = localStorage.getItem("access");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/login");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}delete_account/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      if (response.status === 204 || response.status === 200) {
        alert("Account Deleted Successfully");
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      alert("Error deleting account");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full backdrop-blur bg-white/70 border-b border-gray-200 shadow-sm z-50 fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img
            src="/images/talking-icon.svg"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Gupshup</h1>
        </div>

        {/* Auth Section */}
        {access ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full shadow-sm transition duration-150"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {username[0]?.toUpperCase()}
              </div>
              <span className="font-semibold text-gray-800">{username}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-3 w-full hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  </svg>
                  <span>Logout</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-3 px-5 py-3 w-full text-red-600 hover:bg-red-50 transition"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Delete Account</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
