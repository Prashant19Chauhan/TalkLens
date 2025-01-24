
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Import Google Icon from React Icons

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Google Sign In Button */}
        <div className="my-4">
          <button className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
            <FaGoogle className="w-5 h-5 mr-3" /> {/* Google Icon */}
            <span className="font-semibold">Continue with Google</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Dont have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
