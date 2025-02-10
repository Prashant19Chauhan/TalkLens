import { useEffect, useRef, useState } from "react";
import { socket } from "../socketProvider/socket";
import SimplePeer from "simple-peer";
import {useNavigate} from 'react-router-dom'

function Room({ stream1, ownerStream }) {
  const navigate = useNavigate();
  
    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const connectionRef = useRef();
    const [incomingCallInfo, setIncomingCallInfo] = useState({});
    const [isCallAccepted, setIsCallAccepted] = useState(false);

    // Chat State
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        myVideoRef.current.srcObject = stream1;
        peerVideoRef.current.srcObject = ownerStream;

        socket.on("incomingCall", handleIncomingCall);
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("callEnded", handleCallEnd); // Listen for call end signal

        return () => {
            socket.off("incomingCall", handleIncomingCall);
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("callEnded", handleCallEnd);
        };
    }, []);

    const handleIncomingCall = ({ from, signalData }) => {
        setIncomingCallInfo({ isSomeoneCalling: true, from, signalData });
    };

    const answerCall = () => {
        setIsCallAccepted(true);

        const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream1 });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: incomingCallInfo.from });
        });

        peer.on("stream", (currentStream) => {
            peerVideoRef.current.srcObject = currentStream;
        });

        peer.signal(incomingCallInfo.signalData);

        connectionRef.current = peer;
    };

    // Handle receiving messages
    const handleReceiveMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    // Send Message
    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = { sender: socket.id, text: newMessage };
            socket.emit("sendMessage", messageData);
            setMessages((prev) => [...prev, messageData]);
            setNewMessage("");
        }
    };

    // Handle Ending Call
    const endCall = () => {
        socket.emit("endCall", { to: incomingCallInfo.from || socket.id }); // Notify peer
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        resetCallState();
    };

    // Handle Peer Ending Call
    const handleCallEnd = () => {
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        resetCallState();
    };

    // Reset Call State
    const resetCallState = () => {
        setIsCallAccepted(false);
        setIncomingCallInfo({});
        connectionRef.current = null;
        peerVideoRef.current.srcObject = null;
        navigate('/room/end-call')
    };

    return (
        <div className="flex flex-col gap-4">
            <section className="m-4">My ID: <u><i>{socket?.id}</i></u></section>
            
            <div className="flex gap-4">
                <div>
                    <h3 className="text-center">My Video</h3>
                    <video ref={myVideoRef} autoPlay playsInline muted className="video_player" />
                </div>
                <div>
                    <h3 className="text-center">Peer Video</h3>
                    <video ref={peerVideoRef} autoPlay playsInline muted className="video_player" />
                </div>
            </div>

            {isCallAccepted ? (
                <button className="input bg-red" onClick={endCall}>End Call</button>
            ) : (
                incomingCallInfo?.isSomeoneCalling && (
                    <div className="flex flex-col mb-8">
                        <section className="m-4"><u>{incomingCallInfo?.from}</u> is calling</section>
                        <button className="input bg-green" onClick={answerCall}>Answer Call</button>
                    </div>
                )
            )}

            {/* Chat Box */}
            <div className="border p-4 mt-4">
                <h3 className="text-center mb-2">Chat</h3>
                <div className="h-40 overflow-y-auto border p-2">
                    {messages.map((msg, index) => (
                        <p key={index} className={`p-2 rounded ${msg.sender === socket.id ? "bg-blue-200" : "bg-gray-200"}`}>
                            <strong>{msg.sender === socket.id ? "Me" : msg.sender}:</strong> {msg.text}
                        </p>
                    ))}
                </div>
                <div className="flex mt-2">
                    <input
                        type="text"
                        className="flex-grow border p-2"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white p-2 ml-2" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Room;
