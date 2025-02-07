import express from 'express';

import http from 'http';
import { Server } from "socket.io";


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
