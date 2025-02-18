import { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { socket } from "../socketProvider/socket";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function JoinRoom({ setStream1, ownerId, setOwnerStream }) {
  const [stream, setStream] = useState(null);
  const [userId, setUserId] = useState("");
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const connectionRef = useRef();
  const myVideoRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const meetingId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        setStream1(mediaStream);
        myVideoRef.current.srcObject = mediaStream;
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {};
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !isVideoEnabled;
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !isAudioEnabled;
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const initiateCall = () => {
    if (userId) {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signalData) => {
        socket.emit("initiateCall", { userId, signalData, myId: socket?.id }); // initiating call
      });

      peer.on("stream", (remoteStream) => {
        setOwnerStream(remoteStream);
        navigate(`/room/${meetingId}`);
      });

      const uid = currentUser.uid;
      if (uid === ownerId) {
        navigate(`/room/${meetingId.meetingId}`);
      }

      socket.on("callAccepted", (signal) => {
        setIsCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } else {
      alert("Enter user ID to initiate a call");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-[85vh] p-6 space-y-8 md:space-x-10">
      {/* Left Section - Video & Controls */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg w-full md:w-2/3">
        <span className="text-black text-[10px]">{socket.id}</span>
        <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-115 bg-black rounded-4xl transform scale-x-[-1]" />
        <div className="mt-4 flex gap-4 absolute bottom-22">
          <button
            onClick={toggleVideo}
            className="flex items-center gap-2 px-4 py-4 text-2xl bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-4 py-4 text-2xl bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>
        </div>
      </div>

      {/* Right Section - Join Meeting Form */}
      <div className="flex flex-col items-center bg-white rounded-lg w-full md:w-1/3 text-center">
        <h1 className="text-4xl font-[400] text-gray-700">Ready To Join?</h1>
        <p className="text-gray-500 text-xl pt-2">User is waiting in the meeting</p>

        <div className="w-full mt-4">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={initiateCall}
          className="mt-4 px-23 py-4 font-semibold bg-green-600 text-white rounded-4xl hover:bg-green-700 transition"
        >
          Call User
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
