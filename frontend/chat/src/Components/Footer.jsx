import React from "react";

function Footer() {
  return (
    <footer className="bg-[#2b2b2b] text-white px-6 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/talking-icon.svg" alt="logo" className="w-10 invert" />
            <h2 className="text-3xl font-bold tracking-wide">Gupshup</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            India's most loved chat platform — real-time, secure, and verified by the Govt. of India.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#40b299]">About</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer transition">Careers</li>
            <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition">Our Partners</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#40b299]">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer transition">Help Center</li>
            <li className="hover:text-white cursor-pointer transition">How Gupshup Works</li>
            <li className="hover:text-white cursor-pointer transition">Report an Issue</li>
            <li className="hover:text-white cursor-pointer transition">Premium Plans</li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#40b299]">Stay Connected</h3>
          <p className="text-gray-400 text-sm mb-4">Follow us on social media</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <img
                src="/images/facebook.svg"
                alt="Facebook"
                className="w-6 transition-transform hover:scale-110 invert"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <img
                src="/images/instagram.svg"
                alt="Instagram"
                className="w-6 transition-transform hover:scale-110 invert"
              />
            </a>
            <a href="#" aria-label="GitHub">
              <img
                src="/images/github.svg"
                alt="GitHub"
                className="w-6 transition-transform hover:scale-110 invert"
              />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img
                src="/images/linkedin.svg"
                alt="LinkedIn"
                className="w-6 transition-transform hover:scale-110 invert"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-xs mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Gupshup — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
