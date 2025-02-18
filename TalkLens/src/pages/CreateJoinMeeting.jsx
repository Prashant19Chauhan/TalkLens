import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from "../socketProvider/socket";

const CreateJoinMeeting = ({ setOwnerId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "bg4.jpg",
      title: "Talklens is Best",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores recusandae.",
    },
    {
      img: "bg5.jpg",
      title: "Talklens is Best",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores recusandae.",
    },
    {
      img: "bg6.jpg",
      title: "Talklens is Best",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores recusandae.",
    },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

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
          setOwnerId(data.ownerId);
          navigate(`/join-room/${data.roomId}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!isCreating && meetingId) {
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
          setOwnerId(data.ownerId);
          navigate(`/join-room/${data.roomId}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please provide valid input');
    }
    setIsLoading(false);
  };

  return (
    <div className="h-[85vh] flex items-center justify-center relative">
      {/* Left - Form Section */}
      <div className="w-1/2 sm:w-1/2 bg-white p-15 relative z-10">
        <h1 className="text-5xl font-bold text-teal-600 mb-3">
          Video Calling and Meeting for everone
        </h1>
        <p className="text-gray-600 mb-6 text-2xl">Connect, collab and create connection from anywhere in the world</p>
        <form onSubmit={handleSubmit}>
          {/* Toggle between creating and joining a meeting */}
          <div className="mb-4 flex gap-6">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className={`px-6 py-3 rounded-md text-white ${isCreating ? 'bg-teal-600' : 'bg-teal-200'}`}
            >
              Create Meeting
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className={`px-6 py-3 rounded-md text-white ${!isCreating ? 'bg-teal-600' : 'bg-teal-200'}`}
            >
              Join Meeting
            </button>
          </div>

          <div className="w-full flex items-center gap-4">
            {/* Conditional form based on whether creating or joining */}
            {isCreating ? (
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Name</label>
                <input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md"
                  placeholder="Enter meeting name"
                />
              </div>
            ) : (
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting ID</label>
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md"
                  placeholder="Enter meeting ID"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-auto text-gray-400 rounded-md active:text-teal-700 transition py-2 px-4"
            >
              {isLoading ? <span>Loading...</span> : (isCreating ? 'Create' : 'Join')}
            </button>
          </div>
        </form>
      </div>

      {/* Right - Slider Section */}
      <div className="w-1/2 flex items-center justify-center relative overflow-hidden h-[70vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <img src={slide.img} alt="Slide" className="w-100 h-100 object-cover rounded-lg" />
            <h1 className="text-2xl font-semibold text-teal-600 mt-4">{slide.title}</h1>
            <p className="text-gray-600 text-center mt-2">{slide.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateJoinMeeting;
