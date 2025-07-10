import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const access = localStorage.getItem("access");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-green-100 shadow-md px-4 sm:px-6 py-4 sm:py-6 w-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/images/talking-icon.svg"
            alt="logo-icon"
            className="w-8 sm:w-10"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Gupshup</h2>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 ml-auto">
          <div className="text-sm sm:text-base font-semibold uppercase">
            <button onClick={() => navigate('/dashboard')} className="border p-2 rounded bg-green-300 cursor-pointer">{access ? username : ""}</button>
          </div>

          {access && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-700 text-sm sm:text-base cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
