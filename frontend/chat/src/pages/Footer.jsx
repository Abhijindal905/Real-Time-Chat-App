import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-700 text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 ">
        <div className="mr-16 ">
          <div className="flex items-center gap-2 mb-4 ">
            <img src="/src/images/talking-icon.svg" alt="logo-icon" className="w-10" />
            <h2 className="text-3xl font-bold">Gupshup</h2>
          </div>
          <p className="text-base text-gray-400">
            Skip the search Land your Dream chat App with verifyied from gove of India
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <ul className="space-y-1 text-sm text-gray-400 ">
            <li className="text-lg">Career</li>
            <li className="text-lg">term of service</li>
            <li className="text-lg">Privacy Policy</li>
            <li className="text-lg">Partner</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Important Links</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="text-lg">Help center</li>
            <li className="text-lg">How Gupshup Works</li>
            <li className="text-lg">Report a Problem</li>
            <li className="text-lg">SubsCription</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Get in touch</h3>
          <ul className="flex gap-4 mt-2">
            <a href="#"><li><img src="src/images/facebook.svg" alt="facebook" className="w-6" /></li></a>
            <a href="#"><li><img src="src/images/instagram.svg" alt="insta" className="w-6 " /></li></a>
            <a href="#"><li><img src="src/images/github.svg" alt="github" className="w-6 " /></li></a>
            <a href="#"><li><img src="src/images/linkedin.svg" alt="linkedin" className="w-6 " /></li></a>
          </ul>
           <div className="text-lg text-gray-400 space-y-1 mt-4">
                <p>
                     <a href="tel:+919876543210" className="hover:underline">+91 9876543210</a>
                </p>
                <p>
                    <a href="mailto:support@gupshup.com" className="hover:underline mt-2">support@gupshup.com</a>
                </p>
            </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
