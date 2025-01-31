import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { createPeer } from "../service/peer";
import { socket } from "../context/socketProvider";

function Room({ remoteSocketId }) {
  const [myStream, setMyStream] = useState(null);

  const media = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    // Create a peer object using the signaling channel (socket)
    const peer = createPeer(socket);

    // Create an offer
    const offer = await peer.makeCall();

    // Send the offer to the remote peer
    socket.emit("user-call", { to: remoteSocketId, offer });

    // Set the local stream
    setMyStream(stream);
  };

  useEffect(()=>{
    
  })

  return (
    <div>
      <button onClick={media}>click me</button>
      <h1>My Stream</h1>
      {myStream && (
        <ReactPlayer playing muted height="300px" width="300px" url={myStream} />
      )}
    </div>
  );
}

export default Room;
