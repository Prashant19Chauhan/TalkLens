import { useRef, useEffect, useState } from "react";
import { socket } from "../context/socketProvider";

function MeetingRoom({ myStream }) {
  const [peerConnections, setPeerConnections] = useState({}); // Store all user peer connections
  const [remoteStreams, setRemoteStreams] = useState([]); // Store all remote user streams
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = myStream;
    }

    // Handle incoming calls from multiple users
    socket.on("incoming-call", ({ from, offer }) => {
      console.log(`Incoming call from: ${from}`);
      handleIncomingOffer(from, offer);
    });

    // Handle new ICE candidates for multiple users
    socket.on("ice-candidate", ({ from, candidate }) => {
      if (peerConnections[from]) {
        peerConnections[from].addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("ice-candidate");
    };
  }, []);

  const handleIncomingOffer = async (from, offer) => {
    console.log(`Handling offer from ${from}`);
    
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      // Save peer connection for this user
      setPeerConnections(prev => ({ ...prev, [from]: pc }));

      // Attach local stream (your own media) to peer connection
      myStream.getTracks().forEach(track => pc.addTrack(track, myStream));

      // Handle receiving remote tracks
      pc.ontrack = (event) => {
        console.log("Received remote track from", from);
        setRemoteStreams(prev => [...prev, { id: from, stream: event.streams[0] }]);
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(`Sending ICE candidate to ${from}`);
          socket.emit("ice-candidate", { to: from, candidate: event.candidate });
        }
      };

      // Set the remote offer description
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      // Create and send an answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("call-answer", { to: from, answer });

    } catch (err) {
      console.error("❌ Error handling incoming offer:", err);
    }
  };

  return (
    <div>
      <h1>Meeting Room</h1>
      <h2>My Stream</h2>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: "300px", height: "300px", backgroundColor: "black" }} />

      <h2>Connected Users</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {remoteStreams.map(({ id, stream }) => (
          <div key={id}>
            <h4>User: {id}</h4>
            <video autoPlay playsInline ref={(video) => video && (video.srcObject = stream)} style={{ width: "200px", height: "200px", backgroundColor: "black" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingRoom;
