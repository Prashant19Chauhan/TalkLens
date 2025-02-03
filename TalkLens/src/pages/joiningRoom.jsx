import { useEffect, useRef, useState } from "react";
import { socket } from "../context/socketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


function joiningRoom({setMyStream1}) {
  const videoRef = useRef(null);
  const [myStream, setMyStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const { currentUser } = useSelector(state=> state.user);

  useEffect(()=>{
    media();
  }, [])

  const media = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // Set the stream to state and bind it to the video element
      setMyStream(stream);
      setMyStream1(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Bind MediaStream to the video element
      }

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      setPeerConnection(pc);

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            to: meetingId,
          });
        }
      };


    }catch(err){
      console.log(err)
    }
  };

  const videoControl = () => {
    const videoStream = myStream.getVideoTracks()[0];
    if(videoStream.enabled==true){
      videoStream.enabled = false;
    }
    else{
      videoStream.enabled = true;
    }
  }

  const audioControl = () => {
    const audioStream = myStream.getAudioTracks()[0];
    if(audioStream.enabled==true){
      audioStream.enabled = false;
    }
    else{
      audioStream.enabled = true;
    }
  }

  const joinMeeting = async () => {
    const uid = currentUser.uid;
    socket.timeout(5000).emit("room-join", { meetingId, uid }, async (err, response) => {
      if (err) {
        console.log("Room join error:", err);
        setIsLoading(false);
      } else if (response?.success) {
        if (response.ownerId === uid) {
          setIsLoading(false);
          navigate(`/room/${meetingId}`);
        } else {
          try {
            if (!peerConnection) {
              console.error("PeerConnection is not initialized");
              return;
            }

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket.emit("user-call", { to: meetingId, offer });

            socket.on("answer", async ({ from, answer, success }) => {
              if(success==true){
                navigate(`/room/${meetingId}`);
              }
            });

            setIsLoading(true);
          } catch (err) {
            console.error("Error during joinMeeting:", err);
            setIsLoading(false);
          }
        }
      }
    });
  };

  return (
    <div>
      <div>
       {myStream && (
         <video
           ref={videoRef}
           autoPlay
           muted
           playsInline
           style={{ width: "300px", height: "300px", backgroundColor: "black" }}
         />
       )}
      </div>
      <div>
        <button onClick={videoControl}>Video</button>
        <br/>
        <button onClick={audioControl}>Audio</button>
      </div>
      <div>
        <button onClick={joinMeeting}>Join Room</button>
      </div>
    </div>
  )
}

export default joiningRoom
