import { useEffect, useRef, useState } from "react";
import { Device } from 'mediasoup-client'
import { socket } from "../context/socketProvider";

function joinRoom() {
  const videoRef = useRef(null);
  const [rtpCapabilities, setRtpCapabilities] = useState(null);
  const [device, setDevice] = useState(null);
  const [producerTransport, setProducerTransport] = useState(null);
  const [producer, setProducer] = useState(null)

  let params = {
    encoding: [
        {
            rid: 'r0',
            maxBitrate: 100000,
            scalabilityMode: 'S1T3',
        },
        {
            rid: 'r1',
            maxBitrate: 300000,
            scalabilityMode: 'S1T3',
        },
        {
            rid: 'r2',
            maxBitrate: 900000,
            scalabilityMode: 'S1T3',
        }
    ],
    codecOptions: {
        videoGoogleStartBitrate: 1000
    }
  }

  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());

        // Update paramsRef with the stopped track information
        params = {
          track,
          ...params
        };
        console.log("Stream and tracks stopped:", params);
      }
    };
  }, []);

  const createDevice = async() => {
    console.log(rtpCapabilities)
    try{
        const newDevices = new Device()

        await newDevices.load({
            routerRtpCapabilities : rtpCapabilities
        })

        console.log(newDevices);
        setDevice(newDevices)
    }
    catch(err){
        console.log(err)
        if(err.name === 'UnsupportedError'){
            console.log('browser unsupported');
        }
    }
  }

  const getRtpCapabilities = () => {
    socket.emit("getRtpCapabilities", (data) => {
        console.log(`router RTC capabilities... ${data}`)
        setRtpCapabilities(data);
    })
  }

  const createSendTransport = () => {
    socket.emit('createWebRtcTransport', {sender: true}, ({params}) => {
        if(params.error){
            console.log(params.error);
            return
        }
        console.log(params)
        const producerTransport = device.createSendTransport(params);
        setProducerTransport(producerTransport);

        producerTransport.on('connect', async({dtlsParameters}, callback, errback) =>{
            try{
                await socket.emit('transport-connect', {
                    //transportId: producerTransport.id,
                    dtlsParameters: dtlsParameters,
                })

                callback()
            }
            catch(err){
                errback(err);
            }
        })

        producerTransport.on('produce', async(parameters, callback, errback) =>{
            console.log(parameters)
            try{
                await socket.emit('transport-connect', {
                    transportId: producerTransport.id,
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                }, ({id})=> {
                    callback({id})
                })

                callback()
            }
            catch(err){
                errback(err);
            }
        })
    })
  }
  const connectSendTransport = async () => {
    const producer = await producerTransport.produce(params)
    setProducer(producer);
    producer.on('trackended', () => {
        console.log('track ended')
    })
    producer.on('transportclose', () => {
        console.log('transport ended')
    })
  }

  return (
    <div>
      <h2>Live Video Stream</h2>
      <video ref={videoRef} autoPlay playsInline muted />

      <button onClick={getRtpCapabilities}>getRtpCapabilities</button>
      <br/>
      <button onClick={createDevice}>create device</button>
      <br/>
      <button onClick={createSendTransport}>create Transport</button>
      <br/>
      <button onClick={connectSendTransport}>connect transport</button>
    </div>
  );
}

export default joinRoom;
