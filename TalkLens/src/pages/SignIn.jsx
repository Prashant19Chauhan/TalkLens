import OAuth from '../components/OAuth';
import { useState } from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import { data, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {loginStart, loginFailure, loginSuccess} from '../redux/userSlice'


const SignIn = ({ setLogin }) => {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})  
  }

  const loginHandler = async(e) => {
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
        body: JSON.stringify({idToken}),
      })
      const data = await response.json();
      if(response.status!=201){
        dispatch(loginFailure(data.message));
      }
      else{
        dispatch(loginSuccess(data));
        return navigate("/")
      }

    } catch (error) {
      dispatch(loginFailure(error.message));
    }
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            {loading?<span>Loading...</span>:<span>Sign In</span>}
          </button>
        </form>

        <div>
          <OAuth />
        </div>
        
        <div>
          {errorMessage}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Dont have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
