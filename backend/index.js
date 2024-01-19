const express=require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ConnectDB = require('./database/db');
const cors = require('cors');
const cloudinary = require('cloudinary');
const colors = require("colors");
const morgan = require("morgan")
const acceptMultimedia = require('connect-multiparty');
const app=express();
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(acceptMultimedia())

//cors config to accept request from frontend
const corsOptions = {
    origin: true,
    credentials:true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

ConnectDB();

app.use(express.json());
app.use(morgan("dev"));


//server working
app.get("/",(req,res)=>{
  res.send("<h1>Server is working</h1>")
})
app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/license', require('./routes/licenseRoutes'))



const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is working at port: http://localhost:${port}`.cyan.underline.bold);
});


