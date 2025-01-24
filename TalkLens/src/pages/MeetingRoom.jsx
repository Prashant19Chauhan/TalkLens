import { FaMicrophoneSlash, FaMicrophone, FaVideoSlash, FaVideo, FaPhoneAlt, FaCog } from 'react-icons/fa'; // Import icons from React Icons

const MeetingRoom = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Meeting Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Meeting Room</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Leave Meeting
        </button>
      </header>

      {/* Meeting Content */}
      <div className="flex flex-grow p-6">
        {/* Video Container */}
        <div className="flex-grow flex justify-center items-center bg-black relative">
          {/* Main Video */}
          <div className="w-full h-full max-w-3xl max-h-3xl bg-gray-800 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              controls
            >
              {/* Replace with your video source */}
              <source src="path_to_video" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-0 right-0 text-white text-lg flex justify-center gap-6">
            {/* Mute Button */}
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaMicrophoneSlash className="w-6 h-" /> {/* Mute Icon */}
            </button>

            {/* Camera Button */}
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaVideoSlash className="w-6 h-6" /> {/* Camera Off Icon */}
            </button>

            {/* Settings Button */}
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaCog className='w-6 h-6'/> {/* Settings Icon */}
            </button>

            {/* End Meeting Button */}
            <button className="bg-red-600 p-2 rounded-full hover:bg-red-700">
              <FaPhoneAlt className="w-6 h-6" /> {/* End Call Icon */}
            </button>
          </div>
        </div>

        {/* Participants */}
        <div className="w-1/4 flex flex-col gap-4 pl-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Participants</h2>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">Invite</button>
          </div>

          {/* Participant Video 1 */}
          <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay muted>
                {/* Replace with participant video */}
                <source src="path_to_video" />
              </video>
            </div>
            <p className="text-white">Participant 1</p>
          </div>

          {/* Participant Video 2 */}
          <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay muted>
                {/* Replace with participant video */}
                <source src="path_to_video" />
              </video>
            </div>
            <p className="text-white">Participant 2</p>
          </div>

          {/* More participants can be added similarly */}
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
