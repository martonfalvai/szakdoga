import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#f6dfc6d9] to-[#fddcbcd9] text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
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
          </div>

          {/* Gyors linkek */}
          <div>
            <h3 className="text-lg text-[#5c4033] font-semibold mb-6">
              Gyors linkek
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-[#5c4033] hover:text-[#8a5d2b] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Főoldal
                </Link>
              </li>
              <li>
                <Link
                  to="/apartments"
                  className="text-[#5c4033] hover:text-[#8a5d2b] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Ingatlanok
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#5c4033] hover:text-[#8a5d2b]relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Rólunk
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#5c4033] hover:text-[#8a5d2b] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </div>

          {/* Kapcsolat */}
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
                    className="text-[#5c4033] hover:text-[#8a5d2b] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
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
                    className="text-[#5c4033] hover:text-[#8a5d2b] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    +36 1 233 7582
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Also sav */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#5c4033] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MAPUMA. Minden jog fenntartva.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-[#5c4033] hover:text-[#8a5d2b]  transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
            >
              Adatvédelmi nyilatkozat
            </Link>
            <Link
              to="/terms"
              className="text-[#5c4033] hover:text-[#8a5d2b] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
            >
              Felhasználási feltételek
            </Link>
            <Link
              to="/cookies"
              className="text-[#5c4033] hover:text-[#8a5d2b] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B4513] after:transition-all after:duration-300 hover:after:w-full"
            >
              Sütik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
