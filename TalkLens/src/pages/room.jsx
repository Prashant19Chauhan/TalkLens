import { useEffect, useRef, useState } from "react";
import { socket } from "../socketProvider/socket";
import SimplePeer from "simple-peer";
import { useNavigate } from 'react-router-dom';
import { FaVideo,FaClipboard, FaTimes, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaClosedCaptioning, FaPhone, FaPaperPlane, FaComments, FaUsers } from "react-icons/fa";

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
    
    // Toggle Video/Audio
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);

    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(socket.id)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Hide tooltip after 2 sec
          })
          .catch((err) => console.error("Error copying:", err));
    };

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
        navigate('/room/end-call');
    };

    const toggleVideo = () => {
        const videoTrack = stream1.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
    };

    const toggleAudio = () => {
        const audioTrack = stream1.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
    };

    return (
        <div className="p-6 w-full h-screen bg-[#1C1C1E]">
            <div className="flex h-[64vh]">
                <div className="flex w-3/4 h-full gap-5 p-5">
                    <div className="w-1/2 h-full rounded-2xl">
                        <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-full bg-black rounded-4xl transform scale-x-[-1]"/>
                        <h3 className="flex justify-center">My Video</h3>
                    </div>
                    <div className="w-1/2">
                        <video ref={peerVideoRef} autoPlay playsInline className="w-full h-full bg-black rounded-4xl transform scale-x-[-1]" />
                        <h3 className="flex justify-center">Peer Video</h3>
                    </div>
                </div>
                <div className="w-1/4 text-gray-700">
                    <div className="p-4 mt-4 h-[82vh] rounded-2xl bg-white">
                        <h3 className="text-center mb-2 text-xl font-bold">Chat</h3>
                        <div className="h-[65vh] overflow-y-auto p-2">
                            {messages.map((msg, index) => (
                                <p key={index} className={`p-2 rounded ${msg.sender === socket.id ? "" : ""}`}>
                                    <strong>{msg.sender === socket.id ? "Me" : msg.sender}:</strong> {msg.text}
                                </p>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text"
                                className="flex-grow border-l border-t border-b p-2 rounded-bl-2xl rounded-tl-2xl placeholder:text-gray-500"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button className="border-r border-t border-b text-blcak p-2 rounded-br-2xl rounded-tr-2xl" onClick={sendMessage}><FaPaperPlane size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[20vh] w-3/4 pr-2">
                <div className="w-full h-[50%] p-2 rounded-2xl justify-center">
                    <p className="text-teal-400"><span className="font-bold">me: </span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum non architecto corporis, similique atque eum quibusdam deserunt dolor tenetur alias ut fugiat. Quae maiores, eius dolor tempore ullam adipisci beatae.</p>
                    <p className="text-teal-200"><span className="font-bold">peer: </span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum non architecto corporis, similique atque eum quibusdam deserunt dolor tenetur alias ut fugiat. Quae maiores, eius dolor tempore ullam adipisci beatae.</p>
                </div>
            </div>
            <div className="w-full flex justify-around items-center h-[11vh] p-5">
                <div className="flex gap-2 w-1/4 text-white items-center">
                    <button className="bg-gray-600 text-xl text-white p-2 rounded-full" onClick={copyToClipboard}><FaClipboard size={20} /></button>
                    {/* Tooltip when copied */}
                    {copied && (
                        <span className="flex absolute bg-teal-300 p-3 pl-20 pr-20 bottom-[-70px] right-2 rounded-2xl">
                            Copy to Clipboard!
                        </span>
                    )}
                    <span>{socket.id}</span>
                </div>
                <div className="w-2/4 flex justify-center gap-4">
                    <button
                        onClick={toggleVideo}
                        className="flex items-center gap-2 px-4 py-4 text-2xl bg-gray-600 text-white rounded-full transition"
                    >
                        {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                    <button
                        onClick={toggleAudio}
                        className="flex items-center gap-2 px-4 py-4 text-2xl bg-gray-600 text-white rounded-full transition"
                    >
                        {isAudioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>
                    <button className="p-2 rounded-full px-5 py-4 bg-gray-600 text-white">
                        <FaClosedCaptioning size={20} />
                    </button>
                    <button className="p-2 bg-red-600 px-10 py-4 text-white rounded-full hover:bg-red-700 transition" onClick={endCall}>
                        <FaPhone size={20} />
                    </button>
                </div>
                <div className="w-1/4 flex justify-end gap-2">
                    <button className="p-2 rounded-full px-3 py-3 bg-gray-600 text-white"><FaComments size={20} /></button>
                    <button className="p-2 rounded-full px-3 py-3 bg-gray-600 text-white"><FaUsers size={20} /></button>
                    <div className="fixed right-5 bottom-5 bg-teal-100 rounded-xl">
                        {isCallAccepted ? (
                            <></>
                        ) : (
                            incomingCallInfo?.isSomeoneCalling && (
                                <div className="flex flex-col p-5">
                                    <div className="flex pb-5 justify-between">
                                        <h2 className="text-xl font-semibold text-black">User Request</h2>
                                        <button className="text-red-500" 
                                            onClick={()=>{
                                                setIncomingCallInfo(null)
                                            }}>
                                                <FaTimes size={20} />
                                        </button>
                                    </div>
                                    <section className="text-gray-800 font-bold"><u>{incomingCallInfo?.from}</u> is calling</section>
                                    <button className="bg-teal-400 text-white mt-4 p-3 rounded-2xl" onClick={answerCall}>Accept</button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;
