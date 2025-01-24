import { FaGoogle } from 'react-icons/fa';
import { auth, OAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../redux/userSlice';

function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const googleLoginHandler = async() => {
        const result = await signInWithPopup(auth, OAuthProvider);
        const user = result.user;
        const idToken = user.accessToken;
        try{
            dispatch(loginStart());
            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({idToken})
            })
    
            const data = await response.json();
            if(response.status!=201){
                dispatch(loginFailure(data.message));
            }
            else{
                dispatch(loginSuccess(data));
                return navigate("/")
            }
        }
        catch(err){
            dispatch(loginFailure(err.message));
        }
    }

  return (
    <div>
            {/* Google Sign In Button */}
            <div className="my-4">
                <button onClick={googleLoginHandler} className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
                    <FaGoogle className="w-5 h-5 mr-3" /> {/* Google Icon */}
                    <span className="font-semibold">Continue with Google</span>
                </button>
            </div>
    </div>
  )
}

export default OAuth
