import { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { socket } from "../socketProvider/socket";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <section className="mb-6 text-center">
          <p className="text-lg font-medium">My ID: <u><i>{socket?.id}</i></u></p>
        </section>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">My Video</h3>
          <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-64 rounded-lg shadow-lg mt-4" />
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={initiateCall}
              className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Call User
            </button>

            <button
              onClick={toggleVideo}
              className="p-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
            >
              {isVideoEnabled ? "Turn Video Off" : "Turn Video On"}
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={toggleAudio}
              className="p-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
            >
              {isAudioEnabled ? "Mute Audio" : "Unmute Audio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom;
