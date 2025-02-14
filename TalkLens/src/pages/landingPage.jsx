import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa"; // Import icon

const LandingPage = () => {
  return (
    <div className="h-[85vh] flex flex-col md:flex-row items-center justify-center m-0 p-0">
      {/* Left Side - Content */}
      <div className="text-teal-400 max-w-lg text-center md:text-left flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Silence can also <span className="text-teal-600">talk</span>
        </h1>
        <p className="mt-4 text-lg text-teal-700 font-extrabold">
          Stay connected with your loved ones, no matter where you are. 
          Enjoy crystal-clear calls and seamless conversations.
        </p>

        {/* Features List */}
        <ul className="mt-6 space-y-3 text-teal-700 font-bold">
          <li className="flex items-center">
            <FaPhoneAlt className="text-teal-700 mr-2" />
            Best for high-quality video calls
          </li>
          <li className="flex items-center">
            <FaPhoneAlt className="text-teal-700 mr-2" />
            Secure and private communication
          </li>
          <li className="flex items-center">
            <FaPhoneAlt className="text-teal-700 mr-2" />
            Easy to use and intuitive design
          </li>
          <li className="flex items-center">
            <FaPhoneAlt className="text-teal-700 mr-2" />
            Available on all devices
          </li>
        </ul>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <Link to="/register">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="border-2 border-teal-100 text-teal-100 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-teal-100 hover:text-teal-900 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="mt-10 md:mt-0 md:ml-40 w-full md:w-[40%]">
        <img
          src="3708508.png"
          alt="Video Calling"
          className="w-full  object-cover"
        />
      </div>
    </div>
  );
};

export default LandingPage;
