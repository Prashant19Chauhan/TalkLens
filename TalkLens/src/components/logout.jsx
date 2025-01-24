import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure you want to log out?</h2>
        <p className="text-gray-600 mb-6">You will be redirected to the login page.</p>

        <div className="flex justify-between">
          <button onClick={logoutHandler}
            className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
