import OAuth from '../components/OAuth';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from '../redux/userSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = userCredential.user.accessToken;
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken }),
      })
      const data = await response.json();
      if (response.status !== 201) {
        dispatch(loginFailure(data.message));
      }
      else {
        dispatch(loginSuccess(data));
        return navigate("/")
      }

    } catch (error) {
      dispatch(loginFailure(error.message));
    }

  }

  return (
    <div className="flex min-h-screen">
      {/* Left Div (SignIn Form) */}
      <div className="w-full sm:w-1/2 bg-white p-8 rounded-lg shadow-lg flex justify-center items-center">
        <div className="w-4/5"> {/* Adjusted for better centering on small screens */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

          <form onSubmit={loginHandler}>
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
              {loading ? <span>Loading...</span> : <span>Sign In</span>}
            </button>
          </form>

          <div className="my-4">
            <OAuth />
          </div>

          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link></p>
          </div>
        </div>
      </div>

      {/* Right Div (Image) */}
      <div className="hidden sm:block w-1/2 bg-teal-600">
        <img
          src="bg3.jpg" // Replace with your image URL
          alt="SignIn"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default SignIn;
