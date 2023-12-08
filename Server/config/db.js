require('dotenv').config()
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Timeout in milliseconds (adjust as needed)
  };

mongoose.connect(process.env.MONGO_URI,options).then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error In DB Connection", err);
})