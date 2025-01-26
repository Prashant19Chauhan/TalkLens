import Socketpage from "../meetingSocket/socket"
import { useParams } from "react-router-dom";
import { socket } from "../context/socketProvider";
import { useEffect, useState } from "react";
import Room from "../components/Room";

function MeetingRoom() {
  const[roomEntry, setRoomEntry] = useState(false)
  const[remoteSocketId, setRemoteSoketId] = useState(null);
  const { meetingId } = useParams();
  useEffect(()=>{
    socket.on("user-joined", (uid)=>{
      setRoomEntry(true);
      setRemoteSoketId(uid);
    })
  })

  const entryHandler=()=>{
    setRoomEntry(false);
  }

  return (
    <div>
      <h1>Meeting ID: {meetingId}</h1>
      <Socketpage/>
      {roomEntry?
        <div>
          <p><span>user</span> {remoteSocketId} <span>wants to enter</span></p>
          <button onClick={entryHandler}>Allow</button>
          <button>Not Allow</button>
          <button>Wait</button>
        </div>
        :
        <></>
      }
      <Room/>
    </div>
  )
}

export default MeetingRoom
