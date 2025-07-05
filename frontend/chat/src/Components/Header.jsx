import React from "react";

function Header() {
  return (
    <header className="bg-green-100 shadow-md px-6 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/src/images/talking-icon.svg" alt="logo-icon" className="w-10" />
          <h2 className="text-2xl font-bold text-gray-800">Gupshup</h2>
        </div>
        <div className="flex items-center gap-8 ml-auto">
          <nav>
            <ul className="flex items-center gap-8 text-gray-700 font-medium">
              <li className="text-xl cursor-pointer hover:text-green-600">Home</li>
              <li className="text-xl cursor-pointer hover:text-red-500">
                <i className="fa-regular fa-heart"></i>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
