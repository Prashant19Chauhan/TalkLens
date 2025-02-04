import { useEffect, useRef, useState } from "react";
import { socket } from "../context/socketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function JoiningRoom({ setMyStream1 }) {
  const videoRef = useRef(null);
  const [myStream, setMyStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    startMedia();
  }, []);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
      setMyStream1(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const joinMeeting = async () => {
    if (!myStream) {
      console.error("No media stream available.");
      return;
    }

    const uid = currentUser?.uid;
    if (!uid) return console.error("User is not authenticated");

    socket.timeout(5000).emit("room-join", { meetingId, uid }, async (err, response) => {
      if (err) {
        console.error("Room join error:", err);
      } else if (response?.success) {
        if (response.ownerId === uid) {
          navigate(`/room/${meetingId}`);
        } else {
          try {
            if (peerConnection) {
              console.warn("PeerConnection already exists. Closing old connection.");
              peerConnection.close();  // ✅ Close any existing connection before creating a new one.
            }

            const pc = new RTCPeerConnection({
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
              ],
            });

            setPeerConnection(pc);
            console.log("1")
            // ✅ Ensure tracks are added only once
            myStream.getTracks().forEach(track => {
              console.log("2")
              if (!pc.getSenders().some(sender => sender.track === track)) {
                console.log("3")
                pc.addTrack(track, myStream);
              }
            });
            console.log("4")
            // ✅ Listen for ICE candidates
            pc.onicecandidate = (event) => {
              console.log("5")
              if (event.candidate) {
                console.log("6")
                socket.emit("ice-candidate", {
                  candidate: event.candidate,
                  to: meetingId,
                });
              }
            };

            // ✅ Listen for remote ICE candidates
            socket.on("ice-candidate", ({ candidate }) => {
              console.log("7")
              if (pc && candidate) {
                pc.addIceCandidate(new RTCIceCandidate(candidate));
              }
            });
            console.log("8")
            // ✅ Create an offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            // ✅ Send the offer to the meeting owner
            socket.emit("user-call", { to: meetingId, offer });

            socket.on("answer", async ({ from, answer, success }) => {
              if (success) {
                await pc.setRemoteDescription(new RTCSessionDescription(answer));
                console.log("Remote description set. Navigating to meeting page...");
                navigate(`/room/${meetingId}`);
              }
            });

          } catch (err) {
            console.error("Error during joinMeeting:", err);
          }
        }
      }
    });
  };

  return (
    <div>
      <div>
        {myStream && (
          <video ref={videoRef} autoPlay playsInline style={{ width: "300px", height: "300px", backgroundColor: "black" }} />
        )}
      </div>
      <div>
        <button onClick={joinMeeting}>Join Room</button>
      </div>
    </div>
  );
}

export default JoiningRoom;
