import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const {currentUser} = useSelector(state => state.user);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-extrabold">
          <Link to="/" className="text-white">TalkLens</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/features" className="text-white hover:text-gray-200 transition duration-300">Features</Link>
          <Link to="/pricing" className="text-white hover:text-gray-200 transition duration-300">Pricing</Link>
          <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300">Contact</Link>
        </nav>

        {/* Action Buttons */}
        { currentUser?
          <div>
            <Link to="/dashboard">
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">Dashboard</button>
            </Link>
            <Link to="/logout">
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition">Logout</button>
            </Link>
          </div>
          : 
          <div className="flex space-x-4">
            <Link to="/register">
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
                Log In
              </button>
            </Link>
          </div>
        }

        {/* Mobile Navigation Menu Button */}
        <button className="md:hidden text-white" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
