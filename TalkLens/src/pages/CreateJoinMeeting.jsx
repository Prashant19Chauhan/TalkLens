import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from "../socketProvider/socket";
import { FaVideo } from 'react-icons/fa'; // React Icon for video calling
import bg from '../assets/bg.jpg'; // Import background image

const CreateJoinMeeting = ({ setOwnerId }) => {

  const socketId = socket.id;
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { name, uid } = currentUser;
  const [meetingId, setMeetingId] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission for creating or joining a meeting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isCreating && meetingName) {
      // Logic to create a new meeting
      try {
        const response = await fetch('/api/meeting/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ meetingName: meetingName, hostName: name, userId: uid, socketId: socketId }),
        });
        const data = await response.json();

        if (data.success === true) {
          const meetingId = data.roomId;
          setOwnerId(data.ownerId);
          navigate(`/join-room/${meetingId}`);
          setIsLoading(false);
        }

      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else if (!isCreating && meetingId) {
      // Logic to join a meeting with the provided ID
      try {
        const response = await fetch('/api/meeting/join', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ roomId: meetingId, userId: uid }),
        });
        const data = await response.json();
        if (data.success === true) {
          const meetingId = data.roomId;
          setOwnerId(data.ownerId);
          navigate(`/join-room/${meetingId}`);
          setIsLoading(false);
        }

      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert('Please provide valid input');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Background image with overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4, // Adjust opacity of the image to create overlay effect
        }}
      ></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            <FaVideo className="inline-block text-xl mr-2" /> Create or Join a Meeting
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Toggle between creating and joining a meeting */}
            <div className="mb-4 flex justify-center gap-6">
              <button
                type="button"
                onClick={() => setIsCreating(true)}
                className={`px-6 py-3 rounded-md ${isCreating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Create Meeting
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className={`px-6 py-3 rounded-md ${!isCreating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Join Meeting
              </button>
            </div>

            {/* Conditional form based on whether creating or joining */}
            {isCreating ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Name</label>
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter meeting name"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting ID</label>
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter meeting ID"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {isLoading ? <span>Loading...</span> : (isCreating ? 'Create Meeting' : 'Join Meeting')}
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 z-10">
        <h1 className="text-black text-6xl font-bold text-center ">Welcome to talklens - Feature of video Calling</h1>
      </div>
    </div>
  );
};

export default CreateJoinMeeting;
