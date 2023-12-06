require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error In DB Connection", err);
})