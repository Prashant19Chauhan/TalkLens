import express from 'express'
import './config/db.js';
import { initializeFirebase } from './firebase/firebaseConfig.js';
import userRoute from './routes/user.routes.js'
import authRoute from './routes/auth.routes.js'

const app = express()
app.use(express.json());
const port = 3000

initializeFirebase();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req,res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
      success: false,
      statusCode,
      message
  });
})