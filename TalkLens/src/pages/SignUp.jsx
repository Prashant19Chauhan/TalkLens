
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const registerHandler = async(e) => {
    e.preventDefault();

    try{
      setLoader(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(response.status!=201){
        setMessage(data.message);
        setLoader(false);
      }
      else{
        return navigate("/login");
      }
    }
    catch(err){
      setLoader(false);
      setMessage(err.message);
    }
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        {/* Sign Up Form */}
        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              id="name"
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loader? <span>loading...</span> : <span>Sign Up</span>}
          </button>
        </form>

        <div>
          <OAuth/>
        </div>

        <div>
          {message}
        </div>
        

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
