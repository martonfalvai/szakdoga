import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css"; // opcionális

const Footer: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const footerLinks = [
    { label: "Adatvédelmi nyilatkozat", to: "/privacy" },
    { label: "Felhasználási feltételek", to: "/terms" },
    { label: "Kapcsolat", to: "/contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-[#edc59dd9] to-[#e7b98cd9] text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20"></div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Logo section */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#5b3f23d9] to-[#d38a40d9] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-500">
                <span className="text-xl font-bold">M</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5b3f23d9] to-[#d38a40d9]">
                MAPUMA
              </h2>
            </div>
            <p className="text-[#5c4033] mb-6">
              Találd meg álmdaid lakásást velünk!
            </p>

            {/* Social icons */}
            <div className="flex space-x-4">
              
              
              {/* Add more social icons here */}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg text-[#5c4033] font-semibold mb-6">
              Gyors linkek
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-[#5c4033] hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  Főoldal
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-[#5c4033] hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  Ingatlanok
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#5c4033] hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  Rólunk
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#5c4033] hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg text-[#5c4033] font-semibold mb-6">
              Lépj velünk kapcsolatba
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-4 h-4 text-[#6a3918]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#5c4033]">Email</p>
                  <a
                    href="mailto:manueljosedala@hotmail.com"
                    className="text-[#5c4033] hover:text-[#f8f8f8] transition"
                  >
                    info@mapuma.hu
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <svg
                      className="w-4 h-4 text-[#6a3918]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#5c4033]">Ügyfélszolgálat</p>
                  <a
                    href="tel:+244941540352"
                    className="text-[#5c4033] hover:text-[#f8f8f8] transition"
                  >
                    +12 3 456 7890
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg text-[#5c4033] font-semibold mb-6">
              Légy Naprakész
            </h3>
            <p className="text-[#5c4033] mb-4">Iratkozz fel hírlevelünkre!</p>
            <form className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#5c4033] text-sm mb-4 md:mb-0">
            &copy; {year} MAPUMA. Minden jog fenntartva.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-[#5c4033] hover:text-white transition"
            >
              Adatvédelmi nyilatkozat
            </Link>
            <Link
              to="/terms"
              className="text-[#5c4033] hover:text-white transition"
            >
              Felhasználási feltételek
            </Link>
            <Link
              to="/cookies"
              className="text-[#5c4033] hover:text-white transition"
            >
              Cookiek
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
