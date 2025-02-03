import { useRef, useEffect, useState } from "react";
import { socket } from "../context/socketProvider";

function MeetingRoom({ myStream }) {
  const videoRef = useRef(null);

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
    });

    return () => {
      socket.off("user-joined"); // Cleanup listener on unmount
      socket.off("incoming-call");
    };
  }, []);


  return (
    <div>
      <h1>Meeting Room</h1>
      {myStream ? (
        <video ref={videoRef} autoPlay playsInline muted style={{ width: "300px", height: "300px", backgroundColor: "black" }} />
      ) : (
        <p>Waiting for stream...</p>
      )}
    </div>
  );
}

export default MeetingRoom;
