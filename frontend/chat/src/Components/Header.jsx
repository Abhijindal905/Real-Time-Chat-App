import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;
    try{
      const access = localStorage.getItem("access")
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}delete_account/`, {
        headers: {Authorization: `Bearer ${access}`}
      })

      if (response.status === 204 || response.status === 200){
        alert("Account Deleted Successfully")
        localStorage.clear()
        navigate('/login')
      }else{
        alert("Something went wrong. Please try again.")
      }
    }catch(error){
      alert("Failed to delete account")
    }
  }

  // Close dropdown when clicking outside
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
    <header className="bg-green-100 shadow-md px-6 py-4 w-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/talking-icon.svg"
            alt="logo-icon"
            className="w-10 h-10"
          />
          <h2 className="text-2xl font-bold text-gray-800">Gupshup</h2>
        </div>

        {/* Right side - Auth menu */}
        {access ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-green-300 text-gray-800 px-4 py-2 rounded-md hover:bg-green-400 transition"
            >
              <span className="font-semibold uppercase">{username}</span>
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                  </svg>
                  Logout
                </button>

                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Delete Account
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
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
