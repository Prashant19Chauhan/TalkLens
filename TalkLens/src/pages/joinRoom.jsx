import { useEffect, useRef, useState } from "react"
import SimplePeer from 'simple-peer';
import { socket } from "../socketProvider/socket";
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";




function joinRoom({setStream1, ownerId, setOwnerStream}) {
    const [stream, setStream] = useState(null);
    const [userId, setUserId] = useState('');
    const [isCallAccepted, setIsCallAccepted] = useState(false);
    const connectionRef = useRef();
    const myVideoRef = useRef();
    const { currentUser } = useSelector(state=> state.user);
    const meetingId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            setStream(mediaStream);
            setStream1(mediaStream);
            myVideoRef.current.srcObject = mediaStream;
          }).catch((error) => console.error('Error accessing media devices:', error));
    
        return () => {
        };
      }, []);

    const initiateCall = () => {
        if (userId) {
          const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream,
          });
    
          peer.on('signal', (signalData) => {
            socket.emit('initiateCall', { userId, signalData, myId: socket?.id }); //initiating call
          });
    
          peer.on('stream', (remoteStream) => {
            setOwnerStream(remoteStream);
            navigate(`/room/${meetingId}`)
          });

          console.log(ownerId);
          const uid = currentUser.uid;
          if(uid===ownerId){
            navigate(`/room/${meetingId.meetingId}`)
          }

          socket.on('callAccepted', (signal) => {
            setIsCallAccepted(true);
            peer.signal(signal);
          });
    
          connectionRef.current = peer;
        } else {
          alert('enter user id call initiate a call')
        }
      };

  return (
    <div>
        <section className='m-4'>My ID: <u><i>{socket?.id}</i></u></section>
        <div>
          <h3 className='text-center'>My Video</h3>
          <video ref={myVideoRef} autoPlay playsInline muted className='video_player' />
        </div>
        <div className='flex flex-col w-300 gap-4'>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className='input'
        />
        <button onClick={initiateCall} className='input bg-blue'>Call user</button>
      </div>
    </div>
  )
}

export default joinRoom
