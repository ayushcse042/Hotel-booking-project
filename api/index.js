import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js'

const app = express();

dotenv.config()

app.use(express.json());
app.use(cookieParser());

const connect = async () => {

  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB');
  } catch (error) {
    throw error;
  }

}

mongoose.connection.on('disconnected', () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on('connected', () => {
  console.log("mongoDB connected");
})

//middleware

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })


  console.log("hi Iam a middleware");
})




app.get('/', (req, res) => {
  res.send('GeeksforGeeks');
})

const PORT = 8800;

app.listen(PORT, () => {
  connect();
  console.log(`Running on PORT ${PORT}`);
})