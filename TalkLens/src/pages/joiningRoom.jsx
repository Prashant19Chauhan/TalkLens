import { useEffect, useRef, useState } from "react";
import { socket } from "../context/socketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function joiningRoom({setMyStream1}) {
  const videoRef = useRef(null);
  const [myStream, setMyStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        console.log("true")
      }
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

  const joinMeeting = () => {
    const uid = currentUser.uid;
    socket.timeout(5000).emit("room-join", {meetingId,uid}, (err, response)=>{
      if(err){
        console.log(err);
        setIsLoading(false);
      }
      else if(response){
        if(response.success==true){
          if(response.ownerId==uid){
            setIsLoading(false);
            navigate(`/room/${meetingId}`)
          } 
          else{
            const to= meetingId
            const offer = "hii"
            socket.emit("user-call", {to, offer})
            setIsLoading(true);
          }
        }
      }
    })
  }

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
