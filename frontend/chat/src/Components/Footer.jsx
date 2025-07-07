import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-6 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/src/images/talking-icon.svg" alt="logo-icon" className="w-10 invert" />
            <h2 className="text-3xl font-bold">Gupshup</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Land your dream chat experience with India's trusted chat platform. Verified by Govt. of India.
          </p>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Partners</li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Important Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">How Gupshup Works</li>
            <li className="hover:text-white cursor-pointer">Report a Problem</li>
            <li className="hover:text-white cursor-pointer">Subscription</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" aria-label="Facebook">
              <img src="/src/images/facebook.svg" alt="Facebook" className="w-6 hover:scale-110 transition invert" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/src/images/instagram.svg" alt="Instagram" className="w-6 hover:scale-110 transition invert" />
            </a>
            <a href="#" aria-label="GitHub">
              <img src="/src/images/github.svg" alt="GitHub" className="w-6 hover:scale-110 transition invert" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src="/src/images/linkedin.svg" alt="LinkedIn" className="w-6 hover:scale-110 transition invert" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copy */}
      <div className="text-center text-gray-500 text-xs mt-10">
        &copy; {new Date().getFullYear()} Gupshup. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
