import { useRef, useEffect, useState } from "react";
import { socket } from "../context/socketProvider";

function MeetingRoom({ myStream }) {
  const [offerdetails, setOfferDetails] = useState({})
  const [peerConnection, setPeerConnection] = useState(null);
  const [remoteStream1, setRemoteStream] = useState(null)
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (myStream && videoRef.current) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    // Listen for new user joining the meeting
    socket.on("user-joined", (uid) => {
      console.log(`User joined: ${uid}`);
    });

    socket.on("incoming-call", ({ from, offer }) => {
      console.log(`Incoming call from: ${from}`);
      console.log(`Offer: ${offer}`);
      setOfferDetails({from,offer})
    });

    return () => {
      socket.off("user-joined"); // Cleanup listener on unmount
      socket.off("incoming-call");
    };
  }, []);

  const handleIncomingOffer = async (from, offer) => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      setPeerConnection(pc);

      // Add local stream to peer connection
      myStream.getTracks().forEach((track) => pc.addTrack(track, myStream));

      // Handle incoming remote streams
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStream(remoteStream);
        console.log(remoteStream1)
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
            meetingId: offerdetails.meetingId,
          });
        }
      };

      // Set the remote description (the offer)
      await pc.setRemoteDescription(offer);

      // Create an answer to send back
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer to the caller
      socket.emit("call-answer", { to: from, answer });
    } catch (err) {
      console.error("Error handling incoming offer:", err);
    }
  };

  const admit = () => {
    const from = offerdetails.from
    const offer = offerdetails.offer
    handleIncomingOffer(from, offer);
  }


  return (
    <div>
      <h1>Meeting Room</h1>
      {myStream ? (
        <div>
          <h1>my</h1>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: "300px", height: "300px", backgroundColor: "black" }} />
          <h1>yours</h1>
          <video ref={remoteVideoRef} autoPlay playsInline muted style={{ width: "300px", height: "300px", backgroundColor: "black" }} />
        </div>
      ) : (
        <p>Waiting for stream...</p>
      )}
      <button onClick={admit}>answer</button>
    </div>
  );
}

export default MeetingRoom;
