import { useEffect, useRef, useState } from "react";
import { socket } from "../socketProvider/socket";
import SimplePeer from 'simple-peer';

function room({stream1, ownerStream}) {
    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const connectionRef = useRef();
    const [incominCallInfo, setIncominCallInfo] = useState({})
    const [isCallAccepted, setIsCallAccepted] = useState(false);
    
    useEffect(()=>{
        myVideoRef.current.srcObject = stream1;
        peerVideoRef.current.srcObject = ownerStream;

        socket.on('incomingCall', handleIncomingCall);
        return () => {
            socket.off("incomingCall", handleIncomingCall);
          };
    });

    const handleIncomingCall = ({ from, signalData }) => {
        setIncominCallInfo({ isSomeoneCalling: true, from, signalData });
    }

    const answerCall = () => {
        setIsCallAccepted(true);
    
        const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream1 });
    
        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: incominCallInfo.from });
        });
    
        peer.on('stream', (currentStream) => {
          peerVideoRef.current.srcObject = currentStream;
        });
    
        peer.signal(incominCallInfo.signalData);
    
        connectionRef.current = peer;
    }


  return (
    <div>
        <section className='m-4'>My ID: <u><i>{socket?.id}</i></u></section>
         <div>
          <h3 className='text-center'>My Video</h3>
          <video ref={myVideoRef} autoPlay playsInline muted className='video_player' />
        </div>
        <div>
          <h3 className='text-center'>Peer Video</h3>
          <video ref={peerVideoRef} autoPlay playsInline muted className='video_player' />
        </div>
        {isCallAccepted ?
            <button className='input bg-red'>End Call</button>
            :
            (incominCallInfo?.isSomeoneCalling) &&
            <div className='flex flex-col mb-8'>
                <section className='m-4'><u>{incominCallInfo?.from}</u> is calling</section>
                <button className='input bg-green' onClick={answerCall}>Answer call</button>
            </div>
        }
    </div>
  )
}

export default room
