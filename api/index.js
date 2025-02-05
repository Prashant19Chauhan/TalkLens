import express from 'express';

import http from 'http';
import { Server } from "socket.io";

import mediasoup from 'mediasoup'

import './config/db.js';

import { initializeFirebase } from './firebase/firebaseConfig.js';
import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import meetingRoute from './routes/meetingRoutes.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
const port = 3000;

// Initialize Firebase
initializeFirebase();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/meeting', meetingRoute);

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});


// Start server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let worker;
let router;
let producerTransport;
let consumerTransport;
let producer;

const createWorker = async() => {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort:2020,
  })
  console.log(`worker pid ${worker.pid}`)

  worker.on('died', error => {
    console.error('workerhas died')
    setTimeout(() => process.exit(1), 2000)
  })
  router = await worker.createRouter({mediaCodecs})

  return worker;
}

worker = createWorker()

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,
    parameters: {
      'x-google-start-bitrate' : 1000,
    },
  }
]

io.on('connection' , async(socket)=>{
  console.log("connected with socket id:",socket.id);
  socket.emit('connection-successful', {socketId: socket.id})


  socket.on('disconnect', ()=>{
    console.log("disconnect")
  })

  socket.on('getRtpCapabilities', (callback) => {
    const rtpCapabilities = router.rtpCapabilities
    console.log('rtpCapabilities', rtpCapabilities)

    callback(rtpCapabilities);
  })

  socket.on('createWebRtcTransport', async({sender}, callback) => {
    console.log(`is this sender request ${sender}`)
    if(sender){
      producerTransport = await createWebRtcTransport(callback)
    }
    else{
      consumerTransport = await createWebRtcTransport(callback)
    }
  })

  socket.on('transport-connect', async({ dtlsParameters}) => {
    console.log('DTLS params...', {dtlsParameters})
    await producerTransport.connect({dtlsParameters})
  })

  socket.on('trasport-produce', async({kind, rtpParameters, appData}, callback) => {
    producer = await producerTransport.produce({
      kind,
      rtpParameters,
    })

    console.log('producer Id:', producer.id, producer.kind)
    producer.on('transportclose', () => {
      console.log('trasnport for this producer closed')
      producer.close()
    })

    callback({
      id: producer.id
    })
  })
})

const createWebRtcTransport = async(callback) => {
  try{
    const webRtcTransport_option = {
      listenIps: [
        {
          ip:'127.0.0.1'
        }
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    }

    let transport = await router.createWebRtcTransport(webRtcTransport_option);
    console.log(`transport id: ${transport.id}`)
    transport.on('dtlsstatechange', dtlsState => {
      if(dtlsState==='closed'){
        transport.close()
      }
    })
    transport.on('close', ()=> {
      console.log('transport closed')
    })

    callback({
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      }
    })

    return transport

  }
  catch(err){
    console.log(err);
    callback({
      params: {
        error : err
      }
    })
  }
}
