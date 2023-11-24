const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/project1')
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error In DB Connection", err);
})