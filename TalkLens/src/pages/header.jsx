import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaRocket, FaTags, FaEnvelope } from "react-icons/fa"; // Importing icons

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="text-black bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold">
          <Link to="/" className="text-white">
            <img src="logoNoBg.png" alt="TalkLens Logo" className="h-15 w-55" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-600">
          <Link to="/features" className="hover:text-gray-800 transition flex items-center space-x-2 font-bold">
            <FaRocket /> <span>Features</span>
          </Link>
          <Link to="/pricing" className="hover:text-gray-800 transition flex items-center space-x-2 font-bold">
            <FaTags /> <span>Pricing</span>
          </Link>
          <Link to="/contact" className="hover:text-gray-800 transition flex items-center space-x-2 font-bold">
            <FaEnvelope /> <span>Contact</span>
          </Link>
        </nav>

        {/* User Section */}
        {currentUser ? (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <img 
                src="https://www.w3schools.com/w3images/avatar2.png" 
                alt="Profile" 
                className="w-13 h-13 rounded-full border-2 border-white" 
              />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-10">
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 font-bold">Dashboard</Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100 font-bold">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/register">
              <button className="font-bold bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="font-bold border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-600 hover:text-white transition">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
